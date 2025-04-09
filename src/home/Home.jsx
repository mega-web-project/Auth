import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  useToast,
  Avatar,
  VStack,
  Fade,
  Divider,
} from "@chakra-ui/react";
import axiosClient from "../utils/axios_client";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, setUser, setToken, token } = useStateContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axiosClient.delete("/logout");
      setUser(null);
      setToken(null);

      toast({
        title: "Logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fade in={true}>
      <Box
        maxW="md"
        mx="auto"
        mt={20}
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        bg="white"
        textAlign="center"
      >
        <VStack spacing={5}>
          <Avatar
            size="xl"
            name={user?.first_name}
            src={user?.avatar || ""}
            bg="teal.500"
            color="white"
          />
          <Heading size="lg">
            Welcome{user?.first_name ? `, ${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}` : "!"}
          </Heading>
          <Text fontSize="md" color="gray.600">
            You’re successfully logged in. You can logout
          </Text>

          <Divider />

          <Button
            colorScheme="red"
            onClick={handleLogout}
            isLoading={isLoading}
            loadingText="Logging out"
            width="100%"
            size="md"
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Fade>
  );
}

export default Home;
