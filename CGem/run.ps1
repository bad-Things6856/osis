param(
    [switch]$BuildOnly
)

$ErrorActionPreference = 'Stop'

$msys2Bin = 'C:\msys64\ucrt64\bin'
$gcc = Join-Path $msys2Bin 'gcc.exe'
$raylibInclude = 'C:\msys64\ucrt64\include'
$raylibLib = 'C:\msys64\ucrt64\lib'
$source = Join-Path $PSScriptRoot 'main.c'
$buildDir = Join-Path $PSScriptRoot 'build'
$executable = Join-Path $buildDir 'zombie-runner.exe'

$env:Path = "$msys2Bin;$env:Path"

if (-not (Test-Path $gcc)) {
    throw "GCC was not found at $gcc. Install MSYS2 UCRT64 GCC first."
}

if (-not (Test-Path (Join-Path $raylibInclude 'raylib.h'))) {
    throw "Raylib was not found under $raylibInclude. Install the MSYS2 UCRT64 Raylib package."
}

New-Item -ItemType Directory -Force -Path $buildDir | Out-Null

& $gcc -std=c11 -O2 -Wall -Wextra $source -o $executable `
    "-I$raylibInclude" "-L$raylibLib" -lraylib -lopengl32 -lgdi32 -lwinmm

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host "Built $executable"

if (-not $BuildOnly) {
    & $executable
    exit $LASTEXITCODE
}
