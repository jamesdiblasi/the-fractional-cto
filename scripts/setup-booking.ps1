<#
.SYNOPSIS
  One-time Azure and Exchange setup for the booking panel.

.DESCRIPTION
  Gives the App Service a managed identity, grants that identity the Graph
  application permission Calendars.ReadWrite, and fences it to the one
  mailbox with an Exchange Online application access policy. Run it once as
  a Global Administrator (or Privileged Role Administrator plus Exchange
  Administrator) for the diblasi.com.au tenant. Every step is idempotent.

  Needs: Az CLI (az login), Microsoft.Graph and ExchangeOnlineManagement
  PowerShell modules.

    Install-Module Microsoft.Graph.Applications, ExchangeOnlineManagement -Scope CurrentUser

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

# 2. Calendars.ReadWrite (application) on that identity.
Write-Host 'Granting Graph Calendars.ReadWrite to the identity...'
Connect-MgGraph -Scopes 'AppRoleAssignment.ReadWrite.All', 'Application.Read.All' -NoWelcome
$graphSp = Get-MgServicePrincipal -Filter "appId eq '00000003-0000-0000-c000-000000000000'"
$role = $graphSp.AppRoles | Where-Object {
  $_.Value -eq 'Calendars.ReadWrite' -and $_.AllowedMemberTypes -contains 'Application'
}
$existing = Get-MgServicePrincipalAppRoleAssignment -ServicePrincipalId $principalId |
  Where-Object { $_.AppRoleId -eq $role.Id -and $_.ResourceId -eq $graphSp.Id }
if ($existing) {
  Write-Host '  already granted'
} else {
  New-MgServicePrincipalAppRoleAssignment -ServicePrincipalId $principalId `
    -PrincipalId $principalId -ResourceId $graphSp.Id -AppRoleId $role.Id | Out-Null
  Write-Host '  granted'
}
$appId = (Get-MgServicePrincipal -ServicePrincipalId $principalId).AppId

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
