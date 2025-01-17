import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import uploadPostImage from "../../../api/ImageUpload";

import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
    /* path hook */
    let location = useLocation();
    /* Hook  */
    const [allStatuses, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [progress, setProgress] = useState(0);
    /* external */
    const [modalOpen, setModalOpen] = useState(false);
    /* main  */
    const getImage = (e) => {
        setCurrentImage(e.target.files[0]);
    };

    const uploadImage = () => {
        uploadPostImage(
            currentImage,
            setCurrentImage,
            setProgress,
            currentUser.id,
            setModalOpen
        );
    };

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }

        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, []);
    /* render */
    return (
        <>
            <FileUploadModal
                getImage={getImage}
                uploadImage={uploadImage}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                currentImage={currentImage}
                progress={progress}
            />
            <div className="profile-card">
                {currentUser.id === location?.state?.id ? (
                    <div className="edit-btn">
                        <HiOutlinePencil
                            className="edit-icon"
                            onClick={onEdit}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <div className="profile-info">
                    <div>
                        <img
                            className="profile-image"
                            onClick={() => setModalOpen(true)}
                            src={
                                Object.values(currentProfile).length === 0
                                    ? currentUser.imageLink
                                    : currentProfile?.imageLink
                            }
                            alt="profile-image"
                        />
                        <h3 className="userName">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.name
                                : currentProfile?.name}
                        </h3>
                        <p className="heading">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.headline
                                : currentProfile?.headline}
                        </p>
                        {(currentUser.city || currentUser.country) &&
                        (currentProfile?.city || currentProfile?.country) ? (
                            <p className="location">
                                {Object.values(currentProfile).length === 0
                                    ? `${currentUser.city}, ${currentUser.country} `
                                    : `${currentProfile?.city}, ${currentUser.country}`}
                            </p>
                        ) : (
                            <></>
                        )}
                        {currentUser.website || currentProfile?.website ? (
                            <a
                                className="website"
                                target="_blank"
                                href={
                                    Object.values(currentProfile).length === 0
                                        ? `${currentUser.website}`
                                        : currentProfile?.website
                                }
                            >
                                {Object.values(currentProfile).length === 0
                                    ? `${currentUser.website}`
                                    : currentProfile?.website}
                            </a>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="right-info">
                        <p className="college">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.college
                                : currentProfile?.college}
                        </p>
                        <p className="company">
                            {Object.values(currentProfile).length === 0
                                ? currentUser.company
                                : currentProfile?.company}
                        </p>
                    </div>
                </div>
                <p className="about-me">
                    {Object.values(currentProfile).length === 0
                        ? currentUser.aboutMe
                        : currentProfile?.aboutMe}
                </p>

                {currentUser.skills || currentProfile?.skills ? (
                    <p className="skills">
                        <span className="skill-label">Skills</span>:&nbsp;
                        {Object.values(currentProfile).length === 0
                            ? currentUser.skills
                            : currentProfile?.skills}
                    </p>
                ) : (
                    <></>
                )}
            </div>

            <div className="post-status-main">
                {allStatuses?.map((posts) => {
                    return (
                        <div key={posts.id}>
                            <PostsCard posts={posts} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
