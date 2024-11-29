import { ChakraProvider } from "@chakra-ui/react";
import { ApiTestPage } from "./components/ApiTestPage";

function App() {
  return (
    <ChakraProvider>
      <ApiTestPage />
    </ChakraProvider>
  );
}

export default App;
