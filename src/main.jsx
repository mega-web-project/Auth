import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
    </ChakraProvider>
    
  </StrictMode>
);
