import { useState } from 'react';
import { Box, Button, VStack, Input, Text, useToast } from '@chakra-ui/react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { endpoints } from '../services/api';

SyntaxHighlighter.registerLanguage('json', json);

export const ApiTestPage = () => {
  const [response, setResponse] = useState('');
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [userId, setUserId] = useState('');
  const toast = useToast();

  const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
      const result = await apiCall();
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setResponse(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text mb={4} fontSize="xl" fontWeight="bold">API Endpoints</Text>
          
          <VStack spacing={4} align="stretch">
            <Button
              colorScheme="blue"
              onClick={() => handleApiCall(endpoints.users.getAll)}
            >
              GET /users
            </Button>

            <Box>
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={2}
              />
              <Button
                colorScheme="blue"
                onClick={() => handleApiCall(() => endpoints.users.getByEmail(email))}
                isDisabled={!email}
              >
                GET /users/{email || ':email'}
              </Button>
            </Box>

            <Button
              colorScheme="green"
              onClick={() => handleApiCall(endpoints.products.getAll)}
            >
              GET /products
            </Button>

            <Box>
              <Input
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                mb={2}
              />
              <Button
                colorScheme="green"
                onClick={() => handleApiCall(() => endpoints.products.getById(productId))}
                isDisabled={!productId}
              >
                GET /products/{productId || ':id'}
              </Button>
            </Box>

            <Box>
              <Input
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                mb={2}
              />
              <Button
                colorScheme="purple"
                onClick={() => handleApiCall(() => endpoints.wallet.getByUserId(userId))}
                isDisabled={!userId}
              >
                GET /wallet/{userId || ':userId'}
              </Button>
            </Box>
          </VStack>
        </Box>

        <Box>
          <Text mb={4} fontSize="xl" fontWeight="bold">Response</Text>
          <Box borderWidth={1} borderRadius="md" p={4} bg="gray.50">
            <SyntaxHighlighter
              language="json"
              style={docco}
              customStyle={{
                margin: 0,
                background: 'transparent',
              }}
            >
              {response || 'No response yet'}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};
