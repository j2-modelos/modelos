/**
 * 1 - ir até à pagina o sistemas de gestão de tabelas processuais unificadoas do cnj
 * (https://www.cnj.jus.br/sgt/consulta_publica_movimentos.php (em 12/01/2024))
 * 2 - Expandir todos os níveis existentes abaixo do nível "1 Magistrado"
 * 3 - ir ao console do navegador e executar o script abaixo
 * 4 - copiar a string de declaração e substituir a declaração eixstente em Principal.ts
 */

const arrayDeIds = Array.from(
  document.querySelectorAll('#arvorePublicaFilhos1 .sequencialItem')
).map(e => parseInt(e.textContent))
arrayDeIds.sort((a, b) => a - b)

/* eslint-disable no-console */
console.log('Array de ids: ', arrayDeIds)

console.log('Sentença declaração e atribuição em javascript:')
console.log(`const MOVIMENTOS_MAGISTRADOS_SET = new Set([${arrayDeIds.join(',')}])`)

console.log('Sentença declaração e atribuição em typescript:')
console.log(`export const MOVIMENTOS_MAGISTRADOS_SET =  new Set([${arrayDeIds.join(',')}])`)
/* eslint-enable no-console */