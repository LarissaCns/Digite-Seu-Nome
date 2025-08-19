const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let nomes = [];

app.get('/', (req, res) => {
  res.send('Bem-vindo ao meu back-end em Node.js!');
});

app.post('/greet', (req, res) => {
  let name = req.body.name;
  nomes.push(name);
  res.status(201).json({ message: `Olá, ${name}!`});
});

app.get('/recent', (req, res) => res.status(200).json({ nomes }));

app.get('/clear', (req, res) => {
  nomes = [];
  res.status(200).json({ message: `Nomes excluídos com sucesso!`})
})

app.listen(port, () => {
  console.log(`Back-end rodando na porta ${port}`);
});

module.exports = app;