@echo off
setlocal
title Gomruk - VGLP

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [XETA] Node.js tapilmadi. Node.js qurasdirin: https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [XETA] npm tapilmadi. Node.js qurasdirilmasini yoxlayin.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo [INFO] Dependency-ler qurasdirilir...
  call npm install
  if errorlevel 1 (
    echo [XETA] npm install ugursuz oldu.
    pause
    exit /b 1
  )
)

echo [INFO] Gomruk serveri basladilir...
echo [INFO] Brauzerde acin: http://localhost:3000
echo [INFO] Dayandirmaq ucun Ctrl+C basin.
call npm run dev -- --host 127.0.0.1 --port 3000

if errorlevel 1 (
  echo.
  echo [XETA] Server baglandi veya xeta verdi.
  pause
)

endlocal
