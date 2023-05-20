import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import gravatar from "gravatar";
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";

import Filters from "./Filters";

export default function Navigation() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <Flex h={16} align={"center"} bg={"gray.50"} px={[4, 8]}>
      {router.pathname === "/app/dashboard" ? (
        <>
          <Link
            as={NextLink}
            href={"https://en.gravatar.com/connect"}
            target={"_blank"}
          >
            <img
              src={gravatar.url(session?.user?.email)}
              style={{ width: "2rem", borderRadius: "1rem" }}
            />
          </Link>
          <Box ml={4}>
            <Text m={0}>Hello, {session?.user?.name}!</Text>
            <Text size={"sm"} color={"gray.500"} m={0}>
              Site: {session?.user?.sites?.[0]?._id}
            </Text>
          </Box>
        </>
      ) : (
        <Link
          as={NextLink}
          href={"/"}
          title={
            "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
          }
          hideBelow={"md"}
        >
          <Heading m={0}>Stupendous Analytics</Heading>
        </Link>
      )}
      <Flex align={"center"} ml={"auto"}>
        {!!session?.user ? (
          <>
            {router.pathname === "/app/dashboard" && <Filters />}
            <>
              {router.pathname !== "/app/dashboard" && (
                <Link as={NextLink} href={"/app/dashboard"}>
                  <Button colorScheme={"primary"} size={"sm"} my={0} mr={4}>
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button
                colorScheme={"primary"}
                size={"sm"}
                my={0}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </>
          </>
        ) : (
          <>
            <Link
              as={NextLink}
              href={"/register"}
              title={
                "Join for FREE! | NextJS Website Analytics Dashboard | Stupendous Web"
              }
            >
              <Button colorScheme={"primary"} size={"sm"} my={0} mr={4}>
                Join for FREE!
              </Button>
            </Link>
            <Link
              href={"/login"}
              title={
                "Login | NextJS Website Analytics Dashboard | Stupendous Web"
              }
            >
              <Button colorScheme={"gray"} size={"sm"} my={0}>
                Login
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
