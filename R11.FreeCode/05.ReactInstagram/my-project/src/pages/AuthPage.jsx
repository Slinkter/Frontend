import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";

const AuthPage = () => {
  return (
    <>
      <Flex
        border="1px"
        borderColor="gray.200"
        minH={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            <Box display={{ base: "none", md: "block" }}>
              <Image src="/auth.png" h={650} alt="phone img" />
            </Box>
            <VStack spacing={4} align={"stretch"}>
              <Box>Get the App</Box>
              <Flex gap={5} justifyContent={"center"}>
                <Image src="/playstore.png" h={10} alt="paystore" />
                <Image src="/microsoft.png" h={10} alt="microsoft" />
              </Flex>
            </VStack>
          </Flex>

          <h1>AuthPage</h1>
        </Container>
      </Flex>
    </>
  );
};

export default AuthPage;
