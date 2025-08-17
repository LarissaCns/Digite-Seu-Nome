const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const nomes = ['Alice', 'Bob', 'Charlie', 'Diana'];

app.get('/', (req, res) => {
  res.send('Bem-vindo ao meu back-end em Node.js!');
});

app.post('/greet', (req, res) => {
  let name = req.body.name || 'Visitante';
  nomes.push(name); // Adiciona o nome à lista
  res.status(201).json({ message: `Olá, ${name}!`});
});


app.get('/recent', (req, res) => res.status(200).json({ nomes }));

app.listen(port, () => {
  console.log(`Back-end rodando na porta ${port}`);
});

module.exports = app;