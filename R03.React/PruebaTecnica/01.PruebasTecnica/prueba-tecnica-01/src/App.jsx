import { useEffect, useState } from "react";

const BASE_URL_CATFACT = "https://catfact.ninja/fact";
const BASE_URL_GIPHY = "https://api.giphy.com/v1/gifs";
const apikey = "cZJIAVKs7vpFXA2BcXBLnCFSYPEGTsp3";

export default function App() {
    // hooks
    const [data, setData] = useState([]);
    const [giphys, setGiphys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorCat, setErrorCat] = useState(null); // Error state for Cat API
    const [errorGiphy, setErrorGiphy] = useState(null); // Error state for Giphy API
    const [loadingCat, setLoadingCat] = useState(false); // Loading state for Cat API
    const [loadingGiphy, setLoadingGiphy] = useState(false); // Loading state for Giphy API

    useEffect(() => {
        console.log("1");

        const getCatsRandom = async () => {
            setLoadingCat(true); // Start loading
            try {
                const res = await fetch(BASE_URL_CATFACT);
                if (!res.ok) {
                    throw new Error(
                        `Cat API error: ${res.status} ${res.statusText}`
                    );
                }
                const dataRes = await res.json();
                setData(dataRes);
                setErrorCat(null);
            } catch (error) {
                setErrorCat(error.message);
            } finally {
                setLoadingCat(false); // End loading
            }
        };

        getCatsRandom();
    }, []);

    useEffect(() => {
        console.log("2");
        if (data && data.fact) {
            const word = data?.fact?.split(" ", 3).join(" ");
            setSearchTerm(word);
        }
    }, [data]);

    useEffect(() => {
        console.log("3");
        const getGiphy = async (searchTerm) => {
            if (!searchTerm) return;

            setLoadingGiphy(true); // Start loading
            try {
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
            } catch (error) {
                setErrorGiphy(error.message); // Set error if request fails
            } finally {
                setLoadingGiphy(false); // End loading
            }
        };

        getGiphy(searchTerm);
    }, [searchTerm]);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto max-w-4xl flex justify-center items-center flex-col space-y-10 py-20">
                {/* Mostrar errores o Spinner de la Cat API */}
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
                    <div className="flex flex-col items-center gap-6 p-10 border border-gray-800">
                        <span>{data && data?.fact}</span>
                    </div>
                )}

                {/* Mostrar errores o Spinner de la Giphy API */}
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
                    <div className="flex flex-col items-center gap-6">
                        <img
                            src={giphys[0]?.images?.original?.url}
                            className="h-56 w-56 object-center"
                            alt="Giphy"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
