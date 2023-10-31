import {
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">
        SCRAPAYS BOOK MANAGER
      </Heading>
      <Spacer />
      <HStack spacing="20px">
        <Text>{user?.email}</Text>

        {isAuthenticated ? (
          <Button colorScheme="blackAlpha" onClick={() => logout()}>
            Log out
          </Button>
        ) : (
          <Button colorScheme="blackAlpha" onClick={() => loginWithRedirect()}>
            Log in
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
