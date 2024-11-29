import { Box, Heading, Text } from '@chakra-ui/react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ApiResponse } from '../types';

SyntaxHighlighter.registerLanguage('json', json);

interface ResponseDisplayProps {
  response: ApiResponse | null;
}

export const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  if (!response) {
    return (
      <Box
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="xl"
        p={6}
        bg="whiteAlpha.50"
      >
        <Text color="whiteAlpha.700" textAlign="center">
          Send a request to see the response here
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} color="brand.primary">
        Response
      </Heading>
      <Box
        borderWidth="1px"
        borderColor={response.status === 'success' ? 'brand.primary' : 'red.500'}
        borderRadius="xl"
        overflow="hidden"
      >
        <SyntaxHighlighter
          language="json"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          {JSON.stringify(response.data, null, 2)}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};
