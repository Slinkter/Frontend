import { useState, useEffect } from "react";
const url = "https://www.course-api.com/react-tours-project";
import { type Tour, tourSchema } from "./types";

function Component() {
    // tours
    const [tours, setTours] = useState<Tour[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url);
                console.log(res);
                if (!res.ok) {
                    throw new Error("Failde to fetch tours");
                }
                const rawData: Tour[] = await res.json();
                const result = tourSchema.array().safeParse(rawData);
                if (!result.success) {
                    console.log(result.error.message);
                }

                setTours(result.data);
            } catch (error) {
                const msg =
                    error instanceof Error
                        ? error.message
                        : "there was an error";
                setIsError(msg);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    //
    console.log(isLoading);

    if (isLoading) {
        return <h3>Loading ...</h3>;
    }
    if (isError) {
        return <h3>Error...{isError}</h3>;
    }

    return (
        <div>
            <h2 className="mb-1">React & Typescript</h2>

            {tours.map((tour) => {
                return (
                    <p key={tour.id} className="mb-1">
                        {tour.name}
                    </p>
                );
            })}
        </div>
    );
}
export default Component;

/* import { fetchTours } from "../../final/08-fetch-data/types";
import { useQuery } from "@tanstack/react-query";

function Component() {
    const {
        isPending,
        isError,
        error,
        data: tours,
    } = useQuery({
        queryKey: ["tours"],
        queryFn: fetchTours,
    });

    if (isPending) return <h2>Loading ...</h2>;
    if (isError) return <h2>Error : ...{error.message}</h2>;

    console.log(tours);

    return (
        <div>
            hola
            <h2>Tours</h2>
            {tours.map((tour) => {
                return <p key={tour.id}>{tour.name}</p>;
            })}
        </div>
    );
}

export default Component; */
