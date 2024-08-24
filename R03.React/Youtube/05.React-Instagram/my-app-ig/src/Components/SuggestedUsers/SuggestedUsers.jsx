import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestHeader from "./SuggestHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
    //
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();
    //
    if (isLoading) return null;

    return (
        <VStack
            py={8}
            px={6}
            gap={4}
            border={"3px solid"}
            borderColor={"red.500"}
        >
            <SuggestHeader />
            {suggestedUsers.length !== 0 && (
                <Flex
                    w={"full"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                        Suggested for you
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={"bold"}
                        cursor={"pointer"}
                        _horizontal={{
                            color: "gray.400",
                        }}
                    >
                        See All
                    </Text>
                </Flex>
            )}

            {suggestedUsers.map((user) => (
                <SuggestedUser key={user.id}> asdasdsa</SuggestedUser>
            ))}

            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                © 2023 Built By{" "}
                <Link href="" target="_blank" color="blue.500" fontSize={14}>
                    As a IG
                </Link>
            </Box>
        </VStack>
    );
};

export default SuggestedUsers;
