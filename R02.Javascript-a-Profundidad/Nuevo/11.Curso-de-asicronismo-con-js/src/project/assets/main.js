const CHANNELID = "UC3zEMJtd0xl2UCOIsKLh_lg";
const API = `https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNELID}&part=snippet%2Cid&order=date&maxResults=5`;
const content = null || document.getElementById("content");

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
(async () => {
  console.log("ingreso");
  try {
    const videosAPI = await fetchData(API);
    let view = `
    ${videosAPI.items
      .map(
        (video) => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `
      )
      .slice(0, 4)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
})();
