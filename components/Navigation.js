import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import gravatar from "gravatar";

import Filters from "./Filters";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";

export default function Navigation() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <Flex align={"center"} bg={"gray.50"} px={8}>
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
          <div>Hello, {session?.user?.name}!</div>
          <div className={"uk-text-small uk-text-muted"}>
            Site: {session?.user?.sites?.[0]?._id}
          </div>
        </>
      ) : (
        <Link
          as={NextLink}
          href={"/"}
          title={
            "NextJS Website Analytics Dashboard | Stupendous Web | If you want to build community, build stupendous software"
          }
        >
          <Heading pt={4}>Stupendous Analytics</Heading>
        </Link>
      )}
      <Box ml={"auto"}>
        {!!session?.user ? (
          <>
            {router.pathname === "/app/dashboard" && <Filters />}
            <>
              {router.pathname !== "/app/dashboard" && (
                <Link
                  as={NextLink}
                  href={"/app/dashboard"}
                  className={"uk-button uk-button-primary uk-margin-right"}
                >
                  <Button colorScheme={"primary"} mr={4}>
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button
                colorScheme={"primary"}
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
              <Button colorScheme={"primary"} size={"sm"} mt={4} mr={4}>
                Join for FREE!
              </Button>
            </Link>
            <Link
              href={"/login"}
              title={
                "Login | NextJS Website Analytics Dashboard | Stupendous Web"
              }
            >
              <Button colorScheme={"gray"} size={"sm"} mt={4}>
                Login
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
}
