function POSTNET (codeNumStr){
	'use strict'
  function calcularDigitoVerificadorPOSTNET() {
    // Soma todos os dígitos
    const soma = codeNumArray.reduce((total, d) => total + d, 0);
    // Arredonda a soma para o próximo múltiplo de 10
    const proximoMultiploDe10 = Math.ceil(soma / 10) * 10;
    // Calcula o dígito verificador
    const digitoVerificador = proximoMultiploDe10 - soma;
    // Adiciona o dígito verificador ao array
    codeNumArray.push(digitoVerificador);

  }
  
  const domParser = new DOMParser()
  const barHeight = 22
  const barWidth = 2
  const xOffset = 0
  const yOffest = 0
  const codeNumArray = codeNumStr.match(/\d/g);
  calcularDigitoVerificadorPOSTNET()
  let x = 0

	const codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
	const bars = {
		'|': x => domParser.parseFromString(`<rect xmlns="http://www.w3.org/2000/svg" x="${x}" y="${yOffest}" width="${barWidth}" height="${barHeight}" fill="#000000" />`, 'image/svg+xml').documentElement,
		':': x => domParser.parseFromString(`<rect xmlns="http://www.w3.org/2000/svg" x="${x}" y="${yOffest+barHeight/2}" width="${barWidth}" height="${barHeight/2}" fill="#000000" />`, 'image/svg+xml').documentElement
	}

  const viewBox = {
    width: 2*xOffset //OFFSETS
           +barWidth*2 //LARGURA BARRA E ESPAÇO
           *codeNumArray.length //caracteres
           *5 // quantidade de carateres do codigo por digigto
           +barWidth*3, // largura do start e stop do conjunto
           //test 199
    height: 2*yOffest+barHeight //test 35
  }
  
	const svgRoot = domParser.parseFromString(
		`<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBox.width} ${viewBox.height}" class="barcode-canvas" version="1.1" style="shape-rendering:crispEdges;">
			<g xmlns="http://www.w3.org/2000/svg" text-rendering="geometricPrecision">
				<rect xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="${viewBox.width}" height="${viewBox.height}" fill="#ffffff"/>
			</g>
		</svg>`, 
		'image/svg+xml')
	
  const g = svgRoot.getElementsByTagName('g')[0]

  x += xOffset
  g.append(bars['|'](x)) //start
  x += barWidth*2

  codeNumArray.forEach(digito=>{
    const postNetCodeArray = codeArray[digito].split('')
    postNetCodeArray.forEach(bar => {
      g.append(bars[bar](x)) 
      x += barWidth*2
    })
  })

  g.append(bars['|'](x)) //stop

  return svgRoot.documentElement
}

const result = POSTNET('65....912-355')

function POSTNET2 (codeNumStr){
  'use strict'
  const fg = '#000'
  const barHeight = 22
  const barWidth = 2
  const svgBarWidth = 1
  const svgBarHeight = 3
  const svgBarHeightLow = 2
  const xOffset = 0
  const yOffest = 0
  const path = []
  const ns = 'http://www.w3.org/2000/svg'
  const codeNumArray = codeNumStr.match(/\d/g);
  calcularDigitoVerificadorPOSTNET()
  let x = 0

  const codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
	const bars = {
		'|': x => `M${x} ${yOffest}V${svgBarHeight}H${x+svgBarWidth}V${yOffest}Z`,
		':': x => `M${x} ${yOffest+svgBarHeightLow}V${svgBarHeight}H${x+svgBarWidth}V${yOffest+svgBarHeightLow}Z`
	}

  const viewBox = {
    width: 2*xOffset //OFFSETS
           +svgBarWidth*2 //LARGURA BARRA E ESPAÇO
           *codeNumArray.length //caracteres
           *5 // quantidade de carateres do codigo por digigto
           +svgBarWidth*3, // largura do start e stop do conjunto
           //test 199
    height: 2*yOffest+svgBarHeight //test 35
  }
  const viewBox2 = {
    width: 2*xOffset //OFFSETS
           +barWidth*2 //LARGURA BARRA E ESPAÇO
           *codeNumArray.length //caracteres
           *5 // quantidade de carateres do codigo por digigto
           +barWidth*3, // largura do start e stop do conjunto
           //test 199
    height: 2*yOffest+barHeight //test 35
  }

  function calcularDigitoVerificadorPOSTNET() {
    // Soma todos os dígitos
    const soma = codeNumArray.reduce((total, d) => total + parseInt(d), 0);
    // Arredonda a soma para o próximo múltiplo de 10
    const proximoMultiploDe10 = Math.ceil(soma / 10) * 10;
    // Calcula o dígito verificador
    const digitoVerificador = proximoMultiploDe10 - soma;
    // Adiciona o dígito verificador ao array
    codeNumArray.push(digitoVerificador);

  }

  function svg( n, a ) {

    n = document.createElementNS( ns, n )

    for( var o in a || {} ) {

      n.setAttribute( o, a[ o ] )
    }

    return n
  }

  x += xOffset
  path.push(bars['|'](x)) //start
  x += svgBarWidth*2

  codeNumArray.forEach(digito=>{
    const postNetCodeArray = codeArray[digito].split('')
    postNetCodeArray.forEach(bar => {
      path.push(bars[bar](x)) 
      x += svgBarWidth*2
    })
  })

  path.push(bars['|'](x)) //stop

  const r = svg('svg', {

    'viewBox'	: [ 0, 0, viewBox2.width, viewBox2.height ].join(' ')
   /*,'width'		:  viewBox2.width
   ,'height'		:  viewBox2.height*/
   ,'fill'			:  fg
   ,'shape-rendering'	: 'crispEdges'
   ,'xmlns'		:  ns 
   ,'version'		: '1.1'
 })


  r.appendChild( svg('path', {
   'transform'		: 'matrix(' + [ barWidth, 0, 0, barHeight/svgBarHeight, 0, 0 ] + ')',
   'd'			:  path.join('')
  } ) );

  return r
}

function svgToSvgDataUrl(input){
  const svgData = new XMLSerializer().serializeToString(input)
  const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
  const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`

  return svgDataUrl
}