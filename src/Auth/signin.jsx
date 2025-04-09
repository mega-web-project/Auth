import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  VStack,
  Heading,
  useToast,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosClient from "../utils/axios_client";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser, setToken } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axiosClient.post("/login", values);
      if (res && res.data) {
        setUser(res.data.data);
        setToken(res.data.data.access_token);

        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Login failed",
        description:
          err.response?.data?.message || "Please check your credentials.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={16}
      p={8}
      borderWidth={1}
      borderRadius="xl"
      boxShadow="xl"
      bg="white"
    >
      <Heading size="lg" mb={6} textAlign="center" color="teal.600">
        Welcome Back
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt={2}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="full"
            size="lg"
            fontWeight="bold"
            _hover={{ opacity: 0.9 }}
          >
            Log In
          </Button>

          <Text fontSize="sm" color="gray.600">
            Don't have an account?{" "}
            <Link color="teal.500" href="/sign-up" fontWeight="medium">
              Sign up
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
