import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import NextLink from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import analytics from "../images/analytics.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Your passwords must match.");
    } else {
      axios
        .post("/api/users", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/app/dashboard",
          });
        })
        .catch((error) => {
          console.log(error);
          setError(
            error?.response?.data?.title || "Hmm. Something went wrong."
          );
        });
    }
  };

  return (
    <>
      <Head>
        <title>
          Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
          }
        />
        <meta property={"og:type"} content={"website"} />
      </Head>
      <Flex h={"100%"} w={"100%"} align={"center"}>
        <Flex
          minH={"100%"}
          w={"400px"}
          align={"center"}
          bg={"primary.500"}
          color={"primary.50"}
          px={4}
          pb={4}
        >
          <Box w={"100%"}>
            <form onSubmit={handleSubmit}>
              <Text>
                <Link
                  as={NextLink}
                  href={"/"}
                  title={
                    "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
                  }
                  color={"primary.50"}
                >
                  Stupendous Analytics
                </Link>
              </Text>
              <Heading>Join for FREE!</Heading>
              <FormControl isRequired={true}>
                <FormLabel>Name</FormLabel>
                <Input
                  type={"text"}
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                  mb={4}
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type={"email"}
                  value={email}
                  className={"uk-input"}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  mb={4}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type={"password"}
                  value={password}
                  className={"uk-input"}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  minLength={8}
                  mb={4}
                />
                <FormLabel>Password Confirmation</FormLabel>
                <Input
                  type={"password"}
                  value={passwordConfirmation}
                  className={"uk-input"}
                  onChange={(event) =>
                    setPasswordConfirmation(event.currentTarget.value)
                  }
                  minLength={8}
                  mb={4}
                />
              </FormControl>
              {error && (
                <Alert
                  status={"error"}
                  color={"black"}
                  mb={4}
                  borderRadius={"md"}
                >
                  <AlertIcon />
                  <AlertDescription>
                    {error} Please try again or email{" "}
                    <Link href={"mailto:topher@stupendousweb.com"}>
                      topher@stupendousweb.com
                    </Link>{" "}
                    for help.
                  </AlertDescription>
                </Alert>
              )}
              <Button colorScheme={"whiteAlpha"} type={"submit"} mr={4} mb={0}>
                Let&apos;s Go!
              </Button>
              <Link
                as={NextLink}
                href={"/login"}
                title={
                  "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                }
                color={"white"}
              >
                Login
              </Link>
            </form>
          </Box>
        </Flex>
        <Flex w={"100%"} justify={"center"} p={16} hideBelow={"md"}>
          <AspectRatio ratio={4 / 3} w={"400px"}>
            <Image
              src={analytics}
              alt={"Stupendous Analytics"}
              style={{ objectFit: "fill" }}
            />
          </AspectRatio>
        </Flex>
      </Flex>
    </>
  );
}
