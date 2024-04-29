import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../PostFooter";

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={img} alt="profile post" />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src="/profilepic.png"
                      size={"sm"}
                      name="as a programmer"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      ___nickname
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteApha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt={"1d ago"}
                    username={"__asaprogammer"}
                    profilePic="/profilepic.png"
                    text={"Dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h ago"}
                    username={"abrrahmov"}
                    profilePic="/profilepic.png"
                    text={"Nice pic "}
                  />
                  <Comment
                    createdAt={"3h ago"}
                    username={"kentdodds"}
                    profilePic="/profilepic.png"
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt={"1d ago"}
                    username={"__asaprogammer"}
                    profilePic="/profilepic.png"
                    text={"Dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h ago"}
                    username={"abrrahmov"}
                    profilePic="/profilepic.png"
                    text={"Nice pic "}
                  />
                  <Comment
                    createdAt={"3h ago"}
                    username={"kentdodds"}
                    profilePic="/profilepic.png"
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt={"1d ago"}
                    username={"__asaprogammer"}
                    profilePic="/profilepic.png"
                    text={"Dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h ago"}
                    username={"abrrahmov"}
                    profilePic="/profilepic.png"
                    text={"Nice pic "}
                  />
                  <Comment
                    createdAt={"3h ago"}
                    username={"kentdodds"}
                    profilePic="/profilepic.png"
                    text={"Good clone dude!"}
                  />
                </VStack>
                <Divider />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        h={"300px"}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={img} w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>
    </>
  );
};

export default ProfilePost;
