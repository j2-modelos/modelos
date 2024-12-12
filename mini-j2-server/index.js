const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 443;
const cors = require('cors');

// Caminho para os arquivos do certificado SSL
const privateKey = fs.readFileSync(path.join(__dirname, 'jeitz2cvt1/key.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'jeitz2cvt1/cert.crt'), 'utf8');
//const ca = fs.readFileSync(path.join(__dirname, 'ca.pem'), 'utf8'); // Se houver, para a cadeia de certificados

// Configuração do certificado SSL
const credentials = { key: privateKey, cert: certificate };

// Diretório onde os arquivos estão armazenados
const pastaArquivos = path.join(__dirname, '..');;

// Habilitar CORS para todas as rotas
app.use(cors(/*{origin: 'https://pje.tjma.jus.br'}*/));

// Serve os arquivos estáticos do diretório especificado com o prefixo /s
app.use('/j2', express.static(pastaArquivos));

// Rota simples de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Inicia o servidor na porta 3000
https.createServer(credentials, app).listen(port, () => {
    console.log(`Servidor SSL rodando em https://localhost:${port}`);
  });
