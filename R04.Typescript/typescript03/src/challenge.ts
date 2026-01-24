import { z } from "zod";

const url = "https://www.course-api.com/react-tours-project";

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
            throw new Error(
                `Error Fecht http error : status ${response.status} `,
            );
        }
        const rawData: Tour[] = await response.json();
        console.log(rawData);

        const result = tourSchema.array().safeParse(rawData);
        console.log(result);

        if (!result.success) {
            throw new Error(`Error Data ${result.error} `);
        }
        return result.data;
    } catch (error) {
        const e = error instanceof Error ? error.message : "there was a error";
        console.log(e);
        return [];
    }
}

const tours = await fetchData(url);
console.log(tours);

tours.map((x) => console.log(x.name));
