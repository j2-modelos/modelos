import { exec } from 'child_process'

console.log('Executando git pull...')

exec('git pull origin master', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar git pull: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
  }
  console.log(`stdout: ${stdout}`)
})
