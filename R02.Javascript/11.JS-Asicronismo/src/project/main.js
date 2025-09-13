const CHANNELID = "UC3zEMJtd0xl2UCOIsKLh_lg";
const API = `https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNELID}&part=snippet%2Cid&order=date&maxResults=5`;
const content = document.getElementById("content") || null;

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "132d33a956msh82d8f59fd876370p198c9ejsncf98f2f52735",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
};

async function fetchData(url) {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}
/* se invoca asi misma  */

async function renderVideos(list) {
    let view = `${list
        .map(
            (item) => `
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${item.snippet.thumbnails.high.url}" 
                alt="${item.snippet.description}" 
                class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${item.snippet.title}
                </h3>
            </div>
             </a>
    `
        )
        .slice(0, 4)
        .join("")}
`;
    content.innerHTML = view;
}

(async () => {
    console.log("ingreso");
    try {
        const videosAPI = await fetchData(API);
        renderVideos(videosAPI.items);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("finally");
    }
})();
