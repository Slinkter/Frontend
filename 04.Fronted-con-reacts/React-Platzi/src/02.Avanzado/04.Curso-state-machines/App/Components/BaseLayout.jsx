import React from "react";
import { useMachine } from "@xstate/react"; // es un hook
import bookingMachine from "../Machine/bookingMachine";

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);
    console.log("nuestra maquina", state);
    return <div>BaseLayout</div>;
};

export default BaseLayout;
