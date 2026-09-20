<#
.SYNOPSIS
  One-time setup of hello@thefractionalcto.au as a shared mailbox in the
  diblasi.com.au Microsoft 365 tenant.

.DESCRIPTION
  1. Adds thefractionalcto.au to the tenant and verifies it. The proof is a
     TXT record, written to the Azure DNS zone with the current az login.
  2. Waits for Exchange to accept the domain, then enables DKIM signing. The
     MX, SPF, autodiscover and DKIM selector records already live in the
     zone (same shape as every other zone in the leadgen resource group);
     the script checks the DKIM selectors match what Exchange expects.
     The domain carries a DMARC policy of quarantine, so without SPF and
     DKIM alignment nothing sent as hello@ would land.
  3. Creates the shared mailbox and gives the owner full access and Send As,
     with sent-as mail copied into the shared Sent Items.

  Run as a Global Administrator. Each of the two sign-ins opens a browser;
  az must already be logged in with rights to the DNS zone. Every step is
  idempotent, so re-running after a pause is safe.

  Needs: Az CLI, Microsoft.Graph.Authentication and ExchangeOnlineManagement.
#>
param(
  [string]$Domain = 'thefractionalcto.au',
  [string]$Mailbox = 'hello@thefractionalcto.au',
  [string]$DisplayName = 'The Fractional CTO',
  [string]$Owner = 'james@diblasi.com.au',
  [string]$ResourceGroup = 'leadgen'
)

$ErrorActionPreference = 'Stop'

# --- 1. Domain in the tenant ------------------------------------------------

Import-Module Microsoft.Graph.Authentication
Write-Host "Adding $Domain to the tenant..."
Connect-MgGraph -Scopes 'Domain.ReadWrite.All' -NoWelcome
try {
  $dom = Invoke-MgGraphRequest -Method GET -Uri "v1.0/domains/$Domain"
  Write-Host "  exists (verified: $($dom.isVerified))"
} catch {
  $dom = Invoke-MgGraphRequest -Method POST -Uri 'v1.0/domains' -Body @{ id = $Domain }
  Write-Host '  added'
}

if (-not $dom.isVerified) {
  Write-Host '  Verifying ownership...'
  $txt = (Invoke-MgGraphRequest -Method GET -Uri "v1.0/domains/$Domain/verificationDnsRecords").value |
    Where-Object { $_.recordType -eq 'Txt' } | Select-Object -First 1
  $existing = az network dns record-set txt show -g $ResourceGroup -z $Domain -n '@' --query "TXTRecords[].value[0]" -o tsv 2>$null
  if ($existing -notcontains $txt.text) {
    az network dns record-set txt add-record -g $ResourceGroup -z $Domain -n '@' -v $txt.text -o none
    Write-Host "    added TXT @ $($txt.text)"
  }
  for ($i = 0; $i -lt 20; $i++) {
    try {
      $dom = Invoke-MgGraphRequest -Method POST -Uri "v1.0/domains/$Domain/verify"
      if ($dom.isVerified) { break }
    } catch { }
    Write-Host "    waiting for DNS ($($i + 1)/20)..."
    Start-Sleep -Seconds 30
  }
  if (-not $dom.isVerified) { throw "Could not verify $Domain. Check that the zone is delegated to Azure DNS and re-run." }
  Write-Host '  verified'
}

# Tell the tenant the domain is for email, which adds it as an accepted
# domain in Exchange.
if ($dom.supportedServices -notcontains 'Email') {
  Invoke-MgGraphRequest -Method PATCH -Uri "v1.0/domains/$Domain" -Body @{ supportedServices = @('Email') } | Out-Null
  Write-Host '  marked for email'
}

# --- 2. Exchange: accepted domain and DKIM ---------------------------------

Write-Host 'Connecting to Exchange Online...'
Connect-ExchangeOnline -ShowBanner:$false
for ($i = 0; $i -lt 20; $i++) {
  if (Get-AcceptedDomain -Identity $Domain -ErrorAction SilentlyContinue) { break }
  Write-Host "  waiting for $Domain to appear as an accepted domain ($($i + 1)/20)..."
  Start-Sleep -Seconds 30
}

Write-Host 'DKIM...'
$dkim = Get-DkimSigningConfig -Identity $Domain -ErrorAction SilentlyContinue
if (-not $dkim) { $dkim = New-DkimSigningConfig -DomainName $Domain -Enabled $false }
foreach ($sel in 'selector1', 'selector2') {
  $want = $dkim."$($sel)CNAME"
  $have = az network dns record-set cname show -g $ResourceGroup -z $Domain -n "$sel._domainkey" --query CNAMERecord.cname -o tsv 2>$null
  if ($have -ne $want) {
    az network dns record-set cname set-record -g $ResourceGroup -z $Domain -n "$sel._domainkey" -c $want -o none
    Write-Host "  set $sel._domainkey -> $want"
  }
}
if (-not $dkim.Enabled) {
  for ($i = 0; $i -lt 20; $i++) {
    try { Set-DkimSigningConfig -Identity $Domain -Enabled $true; break }
    catch { Write-Host "  waiting for the DKIM CNAMEs to resolve ($($i + 1)/20)..."; Start-Sleep -Seconds 30 }
  }
}
Write-Host "  DKIM enabled: $((Get-DkimSigningConfig -Identity $Domain).Enabled)"

# --- 3. The shared mailbox -------------------------------------------------

Write-Host "Shared mailbox $Mailbox..."
$mb = Get-Mailbox -Identity $Mailbox -ErrorAction SilentlyContinue
if (-not $mb) {
  $mb = New-Mailbox -Shared -Name $DisplayName -DisplayName $DisplayName -PrimarySmtpAddress $Mailbox
  Write-Host '  created'
} else {
  Write-Host '  exists'
}
# Replies sent as hello@ land in the shared Sent Items, not only the owner's.
Set-Mailbox -Identity $Mailbox -MessageCopyForSentAsEnabled $true -MessageCopyForSendOnBehalfEnabled $true

if (-not (Get-MailboxPermission -Identity $Mailbox -User $Owner -ErrorAction SilentlyContinue |
    Where-Object { $_.AccessRights -contains 'FullAccess' })) {
  Add-MailboxPermission -Identity $Mailbox -User $Owner -AccessRights FullAccess -AutoMapping $true | Out-Null
  Write-Host "  full access: $Owner"
}
if (-not (Get-RecipientPermission -Identity $Mailbox -Trustee $Owner -ErrorAction SilentlyContinue |
    Where-Object { $_.AccessRights -contains 'SendAs' })) {
  Add-RecipientPermission -Identity $Mailbox -Trustee $Owner -AccessRights SendAs -Confirm:$false | Out-Null
  Write-Host "  send as: $Owner"
}

Write-Host ''
Write-Host "Done. $Mailbox will appear in Outlook for $Owner within an hour (auto-mapping)."
Write-Host 'Mailjet still needs the domain validated on its side before the site forms can send as hello@.'
