import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import screenshot from "../images/screenshot.png";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>
          NextJS Website Analytics Dashboard | Stupendous Web | If you want to
          build community, build stupendous software
        </title>
        <meta property={"og:url"} content={"https://stupendousanalytics.com"} />
        <meta
          property={"og:title"}
          content={
            "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
          }
        />
        <meta property={"og:type"} content={"website"} />
      </Head>
      <Container h={"100%"} maxW={"container.xl"}>
        <Flex h={"100%"} direction={["column", "row"]} align={"center"} py={8}>
          <Box>
            <Heading as={"h1"}>NextJS Website Analytics Dashboard</Heading>
            <Text>
              Finally an easy-to-install web analytics tracker and dashboard for
              NextJS apps. Getting started with Stupendous Web Analytics is
              easy. Install and add two simple lines of code to your project.
              Need help? Read the{" "}
              <Link
                as={NextLink}
                href={
                  "https://github.com/stupendous-web/stupendous-analytics-next"
                }
              >
                documentation
              </Link>{" "}
              or visit{" "}
              <Link
                as={NextLink}
                href={"https://stupendousweb.com"}
                title={"Web App Development Services | Stupendous Web"}
              >
                Stupendous Web
              </Link>{" "}
              for more.
            </Text>
            {session?.user ? (
              <>
                <Link
                  as={NextLink}
                  href={"/app/dashboard"}
                  title={
                    "Dashboard | NextJS Website Analytics Dashboard | Stupendous Web"
                  }
                >
                  <Button colorScheme={"primary"} mr={4}>
                    Dashboard
                  </Button>{" "}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/register"}
                  title={
                    "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
                  }
                >
                  <Button colorScheme={"primary"} mr={4}>
                    Join for FREE!
                  </Button>
                </Link>
                <Link
                  as={NextLink}
                  href={"/login"}
                  title={
                    "Login | NextJS Website Analytics Dashboard | Stupendous Web"
                  }
                >
                  <Button colorScheme={"gray"} mr={4}>
                    Login
                  </Button>
                </Link>
              </>
            )}
            <Link
              as={NextLink}
              href={
                "https://github.com/stupendous-web/stupendous-analytics-next"
              }
            >
              <Button colorScheme={"gray"}>Docs</Button>
            </Link>
            <Text fontSize={"sm"} className={"uk-text-small"}>
              &copy; Copyright 2022{" "}
              <Link
                as={NextLink}
                href={"https://stupendousweb.com"}
                title={"Web App Development Services | Stupendous Web"}
              >
                Stupendous Web
              </Link>
              .
            </Text>
          </Box>
          <Box boxShadow={"md"} borderRadius={"2xl"} m={[null, 8]}>
            <Image src={screenshot} alt={"NextJS Web Analytics Dashboard"} />
          </Box>
        </Flex>
      </Container>
    </>
  );
}
