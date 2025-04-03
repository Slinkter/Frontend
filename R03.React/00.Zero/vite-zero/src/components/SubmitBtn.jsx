import React from "react";
import { useNavigation } from "react-router";

const SubmitBtn = ({ text }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <>
            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="loading loading-spinner">{text}</span>
                        sending...
                    </>
                ) : (
                    text || "submit"
                )}
            </button>
        </>
    );
};

export default SubmitBtn;
