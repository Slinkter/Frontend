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

    return <div>CreatePost</div>;
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
        const newPost = {};

        try {
            const postDocRef = await addDoc(
                collection(firestore, "posts"),
                newPost
            );
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
                createPost({});
            }
            if (pathname !== "/" && userProfile.uid === authUser.uid) {
                addPost({});
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
