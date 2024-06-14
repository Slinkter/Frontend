import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import usePreviewImg from "../../hooks/usePreviewImg";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userStore";
import useShowToast from "../../hooks/useShowToast";
import { BsFillImageFill } from "react-icons/bs";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/config";
import { ref } from "firebase/database";
import { getDownloadURL, uploadString } from "firebase/storage";
import { CreatePostLogo } from "../../assets/contains";
import usePostStore from "../../store/postStore";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { selectedFiled, handleImageChange, setSelectedFiled } =
    usePreviewImg();
  const { isLoading, handleCreatePost } = useCreatePost();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFiled, caption);
      onClose();
      setCaption("");
      setSelectedFiled(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlhap.400" }}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption ..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Input
              type="file"
              ref={imageRef}
              onChange={handleImageChange}
              hidden
            />
            <BsFillImageFill
              size={16}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => imageRef.current.click()}
            />
            {selectedFiled && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFiled} alt="img selected" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFiled(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function useCreatePost() {
  const [isLoading, setisLoading] = useState(false);
  const { pathname } = useLocation();
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  /*  */
  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setisLoading(true);

    const newPost = {};
    newPost.caption = caption;
    newPost.likes = [];
    newPost.comments = [];
    newPost.createdAt = Date.now();
    newPost.createdBy = authUser.uid;

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);
      const downloadURL = await getDownloadURL(imageRef);
      await uploadString(imageRef, selectedFile, "data_url");
      await updateDoc(postDocRef, { imageURL: downloadURL });
      newPost.imageURL = downloadURL;
      /*  */
      const userDocRef = doc(firestore, "user", authUser.uid);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      /*  */
      if (userProfile.uid === authUser.uid) {
        createPost({ id: postDocRef.id, ...newPost });
      }
      if (pathname !== "/" && userProfile.uid === authUser.uid) {
        addPost({ id: postDocRef.id, ...newPost });
      }
      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setisLoading(false);
    }
  };

  /*  */
  return { isLoading, handleCreatePost };
}

export default CreatePost;
