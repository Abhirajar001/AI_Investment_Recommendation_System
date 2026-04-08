$ErrorActionPreference = "Stop"

$rootDir = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $rootDir "backend"

$pythonCandidates = @(
	(Join-Path $backendDir "venv\Scripts\python.exe"),
	(Join-Path $backendDir ".venv\Scripts\python.exe")
)

$pythonExe = $null
foreach ($candidate in $pythonCandidates) {
	if (-not (Test-Path $candidate)) {
		continue
	}

	& $candidate -c "import uvicorn" *> $null
	if ($LASTEXITCODE -eq 0) {
		$pythonExe = $candidate
		break
	}
}

if (-not $pythonExe) {
	throw "Could not find a backend Python environment with uvicorn installed (checked venv and .venv)."
}

$backendOutLog = Join-Path $env:TEMP "sepm-backend-smoke.out.log"
$backendErrLog = Join-Path $env:TEMP "sepm-backend-smoke.err.log"
$frontendOutLog = Join-Path $env:TEMP "sepm-frontend-smoke.out.log"
$frontendErrLog = Join-Path $env:TEMP "sepm-frontend-smoke.err.log"

$backendProcess = $null
$frontendProcess = $null

function Wait-ForUrl {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Url,
		[int]$MaxAttempts = 40,
		[int]$DelaySeconds = 1
	)

	for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
		try {
			$response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3
			if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
				return $response.StatusCode
			}
		} catch {
			Start-Sleep -Seconds $DelaySeconds
		}
	}

	throw "Timed out waiting for $Url"
}

function Stop-Proc {
	param([System.Diagnostics.Process]$Proc)
	if ($null -ne $Proc -and -not $Proc.HasExited) {
		Stop-Process -Id $Proc.Id -Force
	}
}

try {
	Write-Host "[smoke] Starting backend..."
	$backendProcess = Start-Process -FilePath $pythonExe `
		-ArgumentList "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8001" `
		-WorkingDirectory $backendDir `
		-NoNewWindow `
		-RedirectStandardOutput $backendOutLog `
		-RedirectStandardError $backendErrLog `
		-PassThru

	Write-Host "[smoke] Starting frontend..."
	$frontendProcess = Start-Process -FilePath "npm.cmd" `
		-ArgumentList "run", "dev", "--", "--host", "127.0.0.1", "--port", "5173", "--strictPort" `
		-WorkingDirectory $rootDir `
		-NoNewWindow `
		-RedirectStandardOutput $frontendOutLog `
		-RedirectStandardError $frontendErrLog `
		-PassThru

	Write-Host "[smoke] Waiting for services..."
	$apiRootStatus = Wait-ForUrl -Url "http://127.0.0.1:8001/"
	$apiOpenApiStatus = Wait-ForUrl -Url "http://127.0.0.1:8001/openapi.json"   
	$frontendStatus = Wait-ForUrl -Url "http://127.0.0.1:5173/"

	$apiRootBody = (Invoke-WebRequest -Uri "http://127.0.0.1:8001/" -UseBasicParsing).Content

	Write-Host "[smoke] API / status: $apiRootStatus"
	Write-Host "[smoke] API /openapi.json status: $apiOpenApiStatus"
	Write-Host "[smoke] Frontend / status: $frontendStatus"
	Write-Host "[smoke] API / body: $apiRootBody"

	if ($apiRootStatus -ne 200 -or $apiOpenApiStatus -ne 200 -or $frontendStatus -ne 200) {
		throw "One or more smoke checks failed."
	}

	Write-Host "[smoke] PASS"
	exit 0
} catch {
	Write-Host "[smoke] FAIL: $($_.Exception.Message)"

	if (Test-Path $backendOutLog) {
		Write-Host "--- Backend stdout ---"
		Get-Content -Path $backendOutLog -Tail 40
	}

	if (Test-Path $backendErrLog) {
		Write-Host "--- Backend stderr ---"
		Get-Content -Path $backendErrLog -Tail 40
	}

	if (Test-Path $frontendOutLog) {
		Write-Host "--- Frontend stdout ---"
		Get-Content -Path $frontendOutLog -Tail 40
	}

	if (Test-Path $frontendErrLog) {
		Write-Host "--- Frontend stderr ---"
		Get-Content -Path $frontendErrLog -Tail 40
	}

	exit 1
} finally {
	Stop-Proc -Proc $backendProcess
	Stop-Proc -Proc $frontendProcess
}
