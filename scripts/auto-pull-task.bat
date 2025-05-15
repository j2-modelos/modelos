@echo off
setlocal enabledelayedexpansion

:: Define data e hora para log
set TIMESTAMP=[%date% %time%]

:: Sobe dois diretórios a partir da pasta onde o script está
cd /d "%~dp0.."
set ROOT_DIR=%cd%

:: Caminho para o log
set LOG_FILE=%ROOT_DIR%\sync.log

:: Cabeçalho de log
echo !TIMESTAMP! Iniciando sincronização automática... >> !LOG_FILE!
echo ---------------------------------------------- >> !LOG_FILE!
echo Diretório atual: !ROOT_DIR! >> !LOG_FILE!

:: Mensagem no console
echo ==============================================
echo [INFO] Iniciando sincronização do repositório
echo Diretório: !ROOT_DIR!
echo ==============================================

:: Executa o comando
echo [INFO] Executando: node scripts/auto-pull.mjs
echo !TIMESTAMP! Executando: node scripts/auto-pull.mjs >> !LOG_FILE!
node scripts/auto-pull.mjs >> !LOG_FILE! 2>&1

:: Verifica se deu erro (código de saída)
if %ERRORLEVEL% neq 0 (
    echo [ERRO] O comando node scripts/auto-pull.mjs terminou com erro (%ERRORLEVEL%)
    echo !TIMESTAMP! ERRO na execução do node scripts/auto-pull.mjs (exit code %ERRORLEVEL%) >> !LOG_FILE!
    exit /b %ERRORLEVEL%
) else (
    echo [SUCESSO] Comando executado com sucesso
    echo !TIMESTAMP! Sucesso: comando executado corretamente. >> !LOG_FILE!
)

echo Finalizando sincronização...
echo ---------------------------------------------- >> !LOG_FILE!
echo. >> !LOG_FILE!
exit /b 0
