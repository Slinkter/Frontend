import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const id_list = "RDPY6GtKWqeVw";
const _API = `https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${id_list}&part=snippet&maxResults=5`;

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(_API, options);
                const result = await response.json();
                console.log(
                    "result.items : ",
                    result.items[0].snippet.resourceId
                );
                setVideos(result.items.slice(0, 9));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-200">
            <div className="container_video ">
                <h2 className="container_h2">Last YouTube Videos</h2>
                <div className="container_grid">
                    {videos.map((video) => (
                        <div
                            key={video.snippet.resourceId.videoId}
                            className="group relative cursor-pointer"
                            onClick={() =>
                                setSelectedVideo(
                                    video.snippet.resourceId.videoId
                                )
                            }
                        >
                            <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.description}
                                    className="w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <h3 className="text-sm text-gray-700">
                                    {video.snippet.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedVideo && (
                    <div className="mt-8">
                        <YouTube
                            videoId={selectedVideo}
                            opts={{ width: "100%", height: "390" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;

/* 

import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const API = `https://youtube-v31.p.rapidapi.com/search?channelId=UC3zEMJtd0xl2UCOIsKLh_lg&part=snippet%2Cid&order=date&maxResults=5`;
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "132d33a956msh82d8f59fd876370p198c9ejsncf98f2f52735",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API, options);
                const result = await response.json();
                setVideos(result.items.slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-200">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Last YouTube Videos
                </h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {videos.map((video) => (
                        <div
                            key={video.id.videoId}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedVideo(video.id.videoId)}
                        >
                            <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.description}
                                    className="w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <h3 className="text-sm text-gray-700">
                                    {video.snippet.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedVideo && (
                    <div className="mt-8">
                        <YouTube
                            videoId={selectedVideo}
                            opts={{ width: "100%", height: "390" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;



*/
