import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Heading,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosClient from "../utils/axios_client";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axiosClient.post("/register", values);
      if (res && res.data) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        // Handle server-side validation
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={8}
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="lg"
      bg="white"
    >
      <Heading size="lg" mb={6} textAlign="center" color="teal.600">
        Create Your Account
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          <FormControl isInvalid={errors.first_name}>
            <FormLabel>First Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUser} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="John" {...register("first_name")} />
            </InputGroup>
            <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.last_name}>
            <FormLabel>Last Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUser} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Doe" {...register("last_name")} />
            </InputGroup>
            <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="john@example.com"
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

          <FormControl isInvalid={errors.password_confirmation}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("password_confirmation")}
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password_confirmation?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="full"
            size="lg"
            _hover={{ opacity: 0.9 }}
          >
            Create Account
          </Button>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link color="teal.500" href="/login">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default SignupPage;
