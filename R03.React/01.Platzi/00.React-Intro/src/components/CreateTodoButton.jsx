import React from "react";
import "../style/CreateTodoButton.css";

/**
 * A button component to open the modal for creating a new TODO.
 * @param {object} props - The props for the component.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpenModal - The state setter function to toggle the modal's visibility.
 * @returns {JSX.Element} The create todo button.
 */
function CreateTodoButton(props) {
    /**
     * Click event handler that toggles the modal's visibility state.
     */
    const onClickButton = () => {
        props.setOpenModal((prevState) => !prevState);
    };

    return (
        <button className="CreateTodoButton" onClick={onClickButton}>
            +
        </button>
    );
}

export { CreateTodoButton };
