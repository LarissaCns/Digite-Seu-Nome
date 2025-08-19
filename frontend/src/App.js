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
  const [mostrarNomes, setMostrarNomes] = useState(false);

  useEffect(() => {
    if (mostrarNomes) {
      try {
        fetch('http://localhost:3001/recent')
        .then((res) => res.json())
        .then((data) => setNomes(data.nomes || []));
      } catch (error) {
        console.error('Erro ao buscar nomes:', error);
      }
      
    }
  }, [mostrarNomes]);

  async function greetUser(name) {
    try {
      const response = await fetch('http://localhost:3001/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Erro ao enviar saudação:', error);
    }
  }

  async function deleteUsers() {
    try {
      const response = await fetch('http://localhost:3001/clear');
      setMostrarNomes(false);
    } catch (error) {
      console.error('Erro ao buscar nomes:', error);
    }
  }

  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="#211C23"
    >
      <VStack
        spacing={5}
        p={8}
        bg="#F5F5D3"
        borderRadius="lg"
        boxShadow="lg"
        width="70%"
        height="90%"
      >
        <Text fontSize="1xl" fontWeight="bold" textAlign="center" color="gray.600">
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
              <Text as="span" color="black.400" fontWeight="bold" fontSize="2xl">
                {message}
              </Text>
            </> 
          : null}
        <Button
          colorScheme="teal"
          onClick={() => setMostrarNomes(!mostrarNomes)}
          width="20%"
        >
          {mostrarNomes ? 'Esconder Nomes' : 'Nomes Cadastrados'}
        </Button>
        {mostrarNomes && (
          <Box mt={2} p={2} borderRadius="md" width="60%">
            {nomes && nomes.length > 0 ? (
              <Text fontSize="lg" color="teal.700" fontStyle="italic">
                {'- ' + nomes.join(', ')}
              </Text>
            ) : (
              <Text color="gray.500">Nenhum nome cadastrado ainda.</Text>
            )}
          </Box>
        )}
        <Button 
          onClick={deleteUsers} 
          colorScheme="teal"
          width="20%">
          Excluir Nomes
        </Button>
      </VStack>
    </Box>
  );
}

export default App;