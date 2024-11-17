import { z } from "zod";
export const tourSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    info: z.string(),
    price: z.string(),
    // someValue: z.string(),
});
export type Tour = z.infer<typeof tourSchema>;

import axios from "axios";
const url = "https://course-api.com/react-tours-project";

export const fetchTours = async (): Promise<Tour[]> => {
    //
    const res = await axios.get<Tour[]>(url);
    const result = tourSchema.array().safeParse(res.data);
    //
    if (!result.success) {
        throw new Error("Parsing failed");
    }
    return result.data;
};

/* 
método *safeParse* 
Utiliza el método  para validar los datos obtenidos de la API contra el esquema tourSchema.
safeParse devuelve un objeto que indica si la validación fue exitosa y los datos validados.

*/
