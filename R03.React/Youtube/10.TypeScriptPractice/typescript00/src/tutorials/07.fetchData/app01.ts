import { z } from "zod";

const tourSchema = z.object({
    id: z.string(),
    name: z.string(),
    info: z.string(),
    image: z.string(),
    price: z.string(),
});

type Tour = z.infer<typeof tourSchema>;

async function fetchData(url: string): Promise<Tour[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Http error! status :");
            console.log(response.status);
        }
        const rawData: Tour[] = await response.json();
        const result = tourSchema.array().safeParse(rawData);
        console.log(result);

        if (!result.success) {
            throw new Error(`Invalid data : ${result.error}`);
        }

        return result.data;
    } catch (error) {
        const errormsg =
            error instanceof Error ? error.message : "there was a error...";
        console.log(errormsg);
        return [];
    }
}

const url = "https://www.course-api.com/react-tours-project";
const tours = await fetchData(url);
tours.map((tour) => {
    console.log(tour.id);
    console.log(tour.info);
    console.log(tour.price);
});
// 5:24:28
