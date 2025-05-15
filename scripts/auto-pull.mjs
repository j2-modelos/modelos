import { exec } from 'child_process'

console.log('====== j2-modelos/modelos ======')
console.log('Descartando alterações locais e executando git pull...')
console.log('cwd:', process.cwd())
console.log('Iniciando')

// Primeiro, rodar o comando para descartar alterações locais
try {
	exec('git reset --hard HEAD', (resetError, resetStdout, resetStderr) => {
	  if (resetError) {
		console.error(`Erro ao resetar mudanças locais: ${resetError.message}`)
		return
	  }
	  if (resetStderr) {
		console.error(`stderr (reset): ${resetStderr}`)
	  }
	  console.log(`stdout (reset): ${resetStdout}`)

	  // Agora que as mudanças locais foram descartadas, executa o git pull
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
	})

	console.log('timestamp: ', new Date())

}catch(e){
	console.log('==== Erro fatal na execução ====')
	console.log(e)
	console.error(e)
}