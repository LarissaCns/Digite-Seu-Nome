import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage(`Erro ao buscar dados: ${err.message}`));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Meu Projeto Full-Stack com Docker</h1>
      <p style={{ fontSize: '1.2em', color: '#555' }}>
        {message}
      </p>
    </div>
  );
}

export default App;