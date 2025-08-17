import React, { useState, useEffect } from 'react';

import {
  Box,
  Heading,
  HStack,
  Text,
  Input,
  Button,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Image
} from '@chakra-ui/react';

import saudacaoGif from './assets/6bff8991c9308a10e5d2baef1153f5fe.gif';

function App() {
  const [message, setMessage] = useState('');
  const [nomes, setNomes] = useState([]);

  async function fetchNomes() {
    try {
      const response = await fetch('http://localhost:3001/recent');
      if (!response.ok) {
        throw new Error('Erro ao buscar nomes');
      }
      const data = await response.json();
      setNomes(data.nomes);
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
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      <VStack
        spacing={5}
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        width="80%"
        height="80%"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.600">
          Digite seu nome e pressione Enter para receber uma saudação personalizada!
        </Text>
        <HStack width="50%">
          <Input 
          placeholder="Seu nome" size="lg"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              greetUser(e.target.value);
              e.target.value = '';
            }
          }}
          />
        </HStack>
          {message ? 
            <>
              <Image src={saudacaoGif} alt="Saudação" boxSize="150px" />
              <Text as="span" color="purple.400" fontWeight="bold" fontSize="2xl">
                {message}
              </Text>
            </> 
          : null}
        <Button onClick={fetchNomes} style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}>
          Nomes Cadastrados
        </Button>
      </VStack>
    </Box>
  );
}

export default App;