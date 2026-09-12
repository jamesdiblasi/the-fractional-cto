<#
.SYNOPSIS
  One-time Azure and Exchange setup for the booking panel.

.DESCRIPTION
  Gives the App Service a managed identity, grants that identity the Graph
  application permission Calendars.ReadWrite, and fences it to the one
  mailbox with an Exchange Online application access policy. Run it once as
  a Global Administrator (or Privileged Role Administrator plus Exchange
  Administrator) for the diblasi.com.au tenant. Every step is idempotent.

  Needs: Az CLI (az login, any identity that can write the web app), and
  the Microsoft.Graph.Authentication and ExchangeOnlineManagement modules.
  The Graph and Exchange steps each open a browser sign-in; use the admin
  account there.

    Install-Module Microsoft.Graph.Authentication, ExchangeOnlineManagement -Scope CurrentUser

.PARAMETER Mailbox
  The mailbox the site books into. Must match BOOKING_MAILBOX on the web app.
#>
param(
  [string]$ResourceGroup = 'leadgen',
  [string]$WebApp = 'the-fractional-cto',
  [Parameter(Mandatory)] [string]$Mailbox
)

$ErrorActionPreference = 'Stop'

# 1. Managed identity on the web app.
Write-Host "Enabling the system-assigned identity on $WebApp..."
$identity = az webapp identity assign -g $ResourceGroup -n $WebApp | ConvertFrom-Json
$principalId = $identity.principalId
Write-Host "  principalId $principalId"

# 2. Calendars.ReadWrite (application) on that identity. Plain Graph calls
#    through Invoke-MgGraphRequest, so only the Authentication module is
#    needed.
Write-Host 'Granting Graph Calendars.ReadWrite to the identity...'
Import-Module Microsoft.Graph.Authentication
Connect-MgGraph -Scopes 'AppRoleAssignment.ReadWrite.All', 'Application.Read.All' -NoWelcome
$graphSp = (Invoke-MgGraphRequest -Method GET -Uri `
  "v1.0/servicePrincipals?`$filter=appId eq '00000003-0000-0000-c000-000000000000'").value[0]
$role = $graphSp.appRoles | Where-Object {
  $_.value -eq 'Calendars.ReadWrite' -and $_.allowedMemberTypes -contains 'Application'
}
$assignments = (Invoke-MgGraphRequest -Method GET -Uri `
  "v1.0/servicePrincipals/$principalId/appRoleAssignments").value
$existing = $assignments | Where-Object { $_.appRoleId -eq $role.id -and $_.resourceId -eq $graphSp.id }
if ($existing) {
  Write-Host '  already granted'
} else {
  Invoke-MgGraphRequest -Method POST -Uri "v1.0/servicePrincipals/$principalId/appRoleAssignments" `
    -Body @{ principalId = $principalId; resourceId = $graphSp.id; appRoleId = $role.id } | Out-Null
  Write-Host '  granted'
}
$appId = (Invoke-MgGraphRequest -Method GET -Uri "v1.0/servicePrincipals/$principalId").appId
Write-Host "  appId $appId"

# 3. Fence the identity to the one mailbox. Without this, Calendars.ReadWrite
#    reaches every mailbox in the tenant.
Write-Host "Restricting the identity to $Mailbox..."
Connect-ExchangeOnline -ShowBanner:$false
$policy = Get-ApplicationAccessPolicy | Where-Object { $_.AppId -eq $appId }
if ($policy) {
  Write-Host "  policy exists: $($policy.Identity)"
} else {
  New-ApplicationAccessPolicy -AppId $appId -PolicyScopeGroupId $Mailbox `
    -AccessRight RestrictAccess -Description "Website booking: $WebApp" | Out-Null
  Write-Host '  policy created (takes up to 30 minutes to apply)'
}
Write-Host 'Checking the policy...'
Test-ApplicationAccessPolicy -Identity $Mailbox -AppId $appId | Format-List AccessCheckResult

Write-Host ''
Write-Host "Done. Now set BOOKING_MAILBOX=$Mailbox on the web app and restart it:"
Write-Host "  az webapp config appsettings set -g $ResourceGroup -n $WebApp --settings BOOKING_MAILBOX=$Mailbox"
Write-Host "  az webapp restart -g $ResourceGroup -n $WebApp"
