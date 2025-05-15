@echo off
setlocal enabledelayedexpansion

:: Sobe dois diretórios a partir da pasta onde o script está
cd /d "%~dp0.."
set ROOT_DIR=%cd%

echo ==============================================
echo [INFO] Iniciando sincronização do repositório Git
echo Diretório: !ROOT_DIR!
echo ==============================================

echo [INFO] Executando: git reset --hard HEAD
git reset --hard HEAD
if %ERRORLEVEL% neq 0 (
    echo [ERRO] git reset --hard HEAD falhou com código %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)

echo [INFO] Executando: git pull origin master
git pull origin master
if %ERRORLEVEL% neq 0 (
    echo [ERRO] git pull origin master falhou com código %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)

echo [SUCESSO] Sincronização Git concluída com sucesso!
exit /b 0
