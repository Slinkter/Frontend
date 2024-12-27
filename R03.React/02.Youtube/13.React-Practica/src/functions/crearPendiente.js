import { db } from "../firebase/credenciales";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

export default async function crearPendiente(data) {
    try {
        const collectionRef = collection(db, "pendientes");
        const pendienteId = await addDoc(collectionRef, data);
        console.log(pendienteId);
    } catch (error) {
        console.log(error);
    }
}

export async function obtenerPendientes() {
    try {
        const collectionRef = collection(db, "pendientes");
        const querySnapshot = await getDocs(collectionRef);
        const pendientes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return pendientes;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function actualizarPendiente(id, data) {
    try {
        const pendienteref = doc(db, "pendientes", id);
        await updateDoc(pendienteref, data);
    } catch (error) {
        console.log(error);
    }
}
