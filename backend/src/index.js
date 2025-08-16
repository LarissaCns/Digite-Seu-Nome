const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Esta mensagem veio do meu back-end em Node.js!' });
});

app.listen(port, () => {
  console.log(`Back-end rodando na porta ${port}`);
});