import React from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

interface EndpointCardProps {
  label: string;
  paramName?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled?: boolean;
}

export const EndpointCard = ({
  label,
  paramName,
  placeholder,
  value,
  onChange,
  onSubmit,
  isDisabled,
}: EndpointCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      borderRadius="xl"
      p={6}
      bg="whiteAlpha.50"
      _hover={{
        borderColor: 'brand.primary',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="brand.primary">
          {label}
        </Text>
        
        {paramName && (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        <Button
          onClick={onSubmit}
          isDisabled={isDisabled}
          variant="solid"
          width="full"
        >
          Send Request
        </Button>
      </VStack>
    </Box>
  );
};
