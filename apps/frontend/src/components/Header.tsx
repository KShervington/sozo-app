import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box textAlign="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" color="brand.primary">
          API Explorer
        </Heading>
        <Text fontSize="lg" color="whiteAlpha.800">
          Test and explore our API endpoints with this interactive interface
        </Text>
      </VStack>
    </Box>
  );
};
