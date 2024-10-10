"use client";

import { useEffect, useState } from "react";
const url = "https://catfact.ninja/fact";

const apikey = "cZJIAVKs7vpFXA2BcXBLnCFSYPEGTsp3";

export default function App() {
    const [data, setData] = useState([]);
    const [giphys, setGiphys] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getCatsRandom = async () => {
            console.group("getCatsRandom");
            try {
                //
                const res = await fetch(url);
                const dataRes = await res.json();
                setData(dataRes);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("end fetch");
            }
            console.groupEnd();
        };
        getCatsRandom();
    }, []);

    useEffect(() => {
        if (data && data.fact) {
            const word = data?.fact?.split(" ", 3).join(" ");
            setSearchTerm(word);
        }
    }, [data]);

    useEffect(() => {
        const getGiphy = async (searchTerm) => {
            console.group("getGiphy");
            if (!searchTerm) return;

            try {
                const urlGiphy = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${searchTerm}&limit=10&rating=G&lang=es`;

                //
                const res = await fetch(urlGiphy);
                const dataRes = await res.json();
                setGiphys(dataRes?.data);
                //

                console.log("searchTerm", searchTerm);
                console.log(url);
                console.log(res);
                console.log(dataRes);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("end fetch");
            }
            console.groupEnd();
        };

        getGiphy(searchTerm);
    }, [searchTerm]);

    return (
        <div className="bg-gray-100 min-h-dvh">
            <div className=" container h-screen mx-auto max-w-6xl flex justify-center items-center flex-col">
                <div>
                    <div className="flex items-center gap-6">
                        <img
                            src={giphys[0]?.images?.original?.url}
                            className="h-56 w-56 object-center"
                            alt="giphys[0]?.images?.original?.url"
                        />

                        <span> {data && data?.fact}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
