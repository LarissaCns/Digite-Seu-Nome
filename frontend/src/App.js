import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  async function fetchNomes() {
    try {
      const response = await fetch('http://localhost:3001/recent');
      if (!response.ok) {
        throw new Error('Erro ao buscar nomes');
      }
      const data = await response.json();
      console.log(data.nomes);
    } catch (error) {
      console.error('Erro ao buscar nomes:', error);
    }
  }

  async function greetUser(name) {
    try {
      const response = await fetch('http://localhost:3001/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error('Erro ao enviar saudação');
      }
      const data = await response.json();
      setMessage(data.message);
      console.log(data.message);
    } catch (error) {
      console.error('Erro ao enviar saudação:', error);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Meu Projeto Full-Stack com Docker</h1>
      <p style={{ fontSize: '1.2em', color: '#333' }}>
        Digite seu nome:
      </p>
      <input
        type="text"
        placeholder="Seu nome"
        style={{ padding: '10px', fontSize: '1em', width: '200px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            greetUser(e.target.value);
            e.target.value = ''; // Limpa o campo após enviar
          }
        }}
      />
      <p style={{ marginTop: '20px', fontSize: '1.2em' }}>{message}</p>
      <p>Nomes cadastrados:</p>
      <button onClick={fetchNomes} style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}>
        Buscar Nomes
      </button>
    </div>
  );
}

export default App;