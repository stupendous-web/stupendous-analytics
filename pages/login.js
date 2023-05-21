import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((response) => {
        if (!response?.error) {
          router.push("/app/dashboard");
        } else {
          setError(
            response?.status === 401
              ? "Hmm. Your email and/or password may be wrong."
              : "Hmm. Something went wrong."
          );
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>
          Login | NextJS Website Analytics Dashboard | Stupendous Web
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "Login | NextJS Website Analytics Dashboard | Stupendous Web"
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
              <Heading>Login</Heading>{" "}
              <FormControl isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input
                  type={"email"}
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  mb={4}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type={"password"}
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  minLength={8}
                  mb={4}
                />
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
                <Button
                  colorScheme={"whiteAlpha"}
                  type={"submit"}
                  mr={4}
                  mb={0}
                >
                  Let&apos;s Go!
                </Button>
                <Link
                  as={NextLink}
                  href={"/register"}
                  title={
                    "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
                  }
                  color={"white"}
                >
                  Join for FREE!
                </Link>
              </FormControl>
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
