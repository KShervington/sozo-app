import { ChakraProvider } from "@chakra-ui/react";
import { ApiTestPage } from "./components/ApiTestPage";
import { theme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApiTestPage />
    </ChakraProvider>
  );
}

export default App;
