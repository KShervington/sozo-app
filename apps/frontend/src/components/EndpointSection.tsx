import React from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { EndpointCard } from './EndpointCard';
import { endpoints } from '../services/api';

interface EndpointSectionProps {
  onApiCall: (apiCall: () => Promise<any>) => Promise<void>;
}

export const EndpointSection = ({ onApiCall }: EndpointSectionProps) => {
  const [params, setParams] = React.useState<Record<string, string>>({});

  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h2" size="lg" color="brand.primary">
        Available Endpoints
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <EndpointCard
          label="GET /users"
          onSubmit={() => onApiCall(endpoints.users.getAll)}
          value=""
          onChange={() => {}}
        />
        
        <EndpointCard
          label="GET /users/:email"
          paramName="email"
          placeholder="Enter email address"
          value={params.email || ''}
          onChange={(value) => setParams(prev => ({ ...prev, email: value }))}
          onSubmit={() => onApiCall(() => endpoints.users.getByEmail(params.email))}
          isDisabled={!params.email}
        />
        
        <EndpointCard
          label="GET /products"
          onSubmit={() => onApiCall(endpoints.products.getAll)}
          value=""
          onChange={() => {}}
        />
        
        <EndpointCard
          label="GET /products/:id"
          paramName="productId"
          placeholder="Enter product ID"
          value={params.productId || ''}
          onChange={(value) => setParams(prev => ({ ...prev, productId: value }))}
          onSubmit={() => onApiCall(() => endpoints.products.getById(params.productId))}
          isDisabled={!params.productId}
        />
        
        <EndpointCard
          label="GET /wallet/:userId"
          paramName="userId"
          placeholder="Enter user ID"
          value={params.userId || ''}
          onChange={(value) => setParams(prev => ({ ...prev, userId: value }))}
          onSubmit={() => onApiCall(() => endpoints.wallet.getByUserId(params.userId))}
          isDisabled={!params.userId}
        />
      </SimpleGrid>
    </VStack>
  );
};
