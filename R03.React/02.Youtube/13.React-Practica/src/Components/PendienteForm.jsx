import React from "react";
import crearPendiente, {
    actualizarPendiente,
    obtenerPendientes,
} from "../functions/crearPendiente";
import { useState } from "react";
import { useEffect } from "react";

const PendienteForm = () => {
    const [pendientes, setPendientes] = useState([]);
    const [editTingPediente, setEditTingPediente] = useState(null);

    useEffect(() => {
        const fetchPendientes = async () => {
            const list = await obtenerPendientes();
            console.log(list);

            setPendientes(list);
        };

        fetchPendientes();
        return () => {};
    }, []);

    const handleEdit = (pendiente) => {
        setEditTingPediente(pendiente);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const priority = form.priority.value;
        const description = form.description.value;
        const contacto = form.contacto.value;
        const formData = { priority, description, contacto };
        console.log("Form data:", formData);

        try {
            if (editTingPediente) {
                console.log("edit");
                await actualizarPendiente(editTingPediente.id, formData);
                setEditTingPediente(null);
            } else {
                await crearPendiente(formData);
                console.log("Task created successfully");
            }

            const updatedPendientes = await obtenerPendientes();
            setPendientes(updatedPendientes);
        } catch (error) {
            console.error("Error creating task:", error);
        }

        form.reset();
        console.log("Form submitted");
    };

    return (
        <>
            <div className="flex flex-row border-2 w-3/4 p-5">
                <form onSubmit={handleSubmit}>
                    <label className="flex flex-col w-full">
                        Priority
                        <select className="w-3/4" name="priority" id="priority">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </label>
                    <label className="flex flex-col">
                        Description
                        <input
                            type="text"
                            id="description"
                            name="description"
                        />
                    </label>
                    <label className="flex flex-col">
                        Contact
                        <input type="email" id="contacto" name="contacto" />
                    </label>
                    <button className="bg-red-300 text-white">Add Task</button>
                </form>
            </div>

            <div className="w-3/4 p-5">
                <h2>Pending Tasks</h2>

                <ul id="taskList">
                    {pendientes.map((x) => (
                        <li key={x.id} className="border-2">
                            {x.contacto || x.contact}
                            <button
                                className="bg-green-500 rounded-md m-2 p-1 text-white"
                                onClick={() => handleEdit(x)}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default PendienteForm;

/* 

*/
