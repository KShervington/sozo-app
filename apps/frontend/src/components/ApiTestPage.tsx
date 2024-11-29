import React, { useState } from 'react';
import { Box, Container, useToast, VStack } from '@chakra-ui/react';
import { Header } from './Header';
import { EndpointSection } from './EndpointSection';
import { ResponseDisplay } from './ResponseDisplay';
import { ApiResponse } from '../types';

export const ApiTestPage = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const toast = useToast();

  const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
      const result = await apiCall();
      setResponse({
        data: result.data,
        status: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setResponse({
        data: error.response?.data || error.message,
        status: 'error',
      });
    }
  };

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Header />
          <EndpointSection onApiCall={handleApiCall} />
          <ResponseDisplay response={response} />
        </VStack>
      </Container>
    </Box>
  );
};
