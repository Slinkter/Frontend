import { useEffect, useState } from "react";

const BASE_URL_CATFACT = "https://catfact.ninja/fact";
const BASE_URL_GIPHY = "https://api.giphy.com/v1/gifs";
const apikey = "cZJIAVKs7vpFXA2BcXBLnCFSYPEGTsp3";

export default function App() {
    // hooks
    const [errorCat, setErrorCat] = useState(null); // Error state for Cat API
    const [errorGiphy, setErrorGiphy] = useState(null); // Error state for Giphy API
    const [loadingCat, setLoadingCat] = useState(false); // Loading state for Cat API
    const [loadingGiphy, setLoadingGiphy] = useState(false); // Loading state for Giphy API
    //
    const [cats, setCats] = useState([]);
    const [giphys, setGiphys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // hooks

    useEffect(() => {
        getCatsRandom();
    }, []);

    useEffect(() => {
        if (!cats) {
            setSearchTerm("");
        } else {
            const text = cats?.fact?.split(" ", 3).join(" "); // tomas las 3 primeras palabras
            setSearchTerm(text);
        }
    }, [cats]);

    useEffect(() => {
        getGiphy(searchTerm);
    }, [searchTerm]);

    // functions

    const getCatsRandom = async () => {
        try {
            setLoadingCat(true); // Start loading
            const res = await fetch(BASE_URL_CATFACT);
            if (!res.ok)
                throw new Error(
                    `Cat API error: ${res.status} ${res.statusText}`
                );
            const dataRes = await res.json();
            /*  */
            setCats(dataRes);
            /*  */
            setErrorCat(null);
            console.log(dataRes);
        } catch (error) {
            setErrorCat(error.message);
        } finally {
            setLoadingCat(false); // End loading
        }
    };

    const getGiphy = async (searchTerm) => {
        if (!searchTerm) return;

        try {
            setLoadingGiphy(true); // Start loading
            const urlGiphy = `${BASE_URL_GIPHY}/search?api_key=${apikey}&q=${searchTerm}&limit=10&rating=G&lang=es`;
            const res = await fetch(urlGiphy);
            if (!res.ok) {
                throw new Error(
                    `Giphy API error: ${res.status} ${res.statusText}`
                );
            }
            const dataRes = await res.json();
            if (!dataRes.data || dataRes.data.length === 0) {
                throw new Error("No Giphy results found.");
            }
            setGiphys(dataRes?.data);
            setErrorGiphy(null); // Reset error if request succeeds
            /*  */
            console.log(dataRes?.data);
        } catch (error) {
            setErrorGiphy(error.message); // Set error if request fails
        } finally {
            setLoadingGiphy(false); // End loading
        }
    };

    return (
        <div className="maincontainer">
            {/* Cat API */}
            {loadingCat ? (
                <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : errorCat ? (
                <div className="text-red-500">
                    <h2>Error fetching Cat fact</h2>
                    <p>{errorCat}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 p-10 border border-gray-800  ">
                    <p>{cats && cats?.fact}</p>
                </div>
            )}

            {/*  Giphy API */}
            {loadingGiphy ? (
                <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : errorGiphy ? (
                <div className="text-red-500">
                    <h2>Error fetching Giphy</h2>
                    <p>{errorGiphy}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 ">
                    <img
                        src={giphys[0]?.images?.original?.url}
                        className="h-56 w-56 object-center "
                        alt="Giphy"
                    />
                </div>
            )}
        </div>
    );
}
