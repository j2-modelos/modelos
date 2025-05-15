@echo off
setlocal enabledelayedexpansion

:: Sobe dois diretórios a partir da pasta onde o script está
cd /d "%~dp0.."
set ROOT_DIR=%cd%

echo.
echo ====================================================
echo [INFO] Iniciando sincronização do repositório Git...
echo Diretório de trabalho: !ROOT_DIR!
echo ====================================================
echo.

:: RESET
echo [PASSO 1] Executando: git reset --hard HEAD
git reset --hard HEAD
if %ERRORLEVEL% neq 0 (
    echo [ERRO] git reset --hard HEAD falhou com código %ERRORLEVEL%
    goto PAUSA
)
echo [OK] Reset concluído.
echo.

:: CLEAN
echo [PASSO 2] Executando: git clean -fd
git clean -fd
if %ERRORLEVEL% neq 0 (
    echo [ERRO] git clean -fd falhou com código %ERRORLEVEL%
    goto PAUSA
)
echo [OK] Arquivos untracked removidos.
echo.

:: PULL
echo [PASSO 3] Executando: git pull origin master
git pull origin master
if %ERRORLEVEL% neq 0 (
    echo [ERRO] git pull falhou com código %ERRORLEVEL%
    goto PAUSA
)
echo [SUCESSO] Código atualizado com sucesso!
echo.

:PAUSA
echo ----------------------------------------------------
echo [INFO] Script finalizado. Fechando em 5 segundos...
timeout /t 5 /nobreak > nul
exit /b 0
