console.log("hola");
const markall = document.querySelector("#mark-all");
const numberElement = document.querySelector("#number");
const posts = document.querySelectorAll(".post");

posts.forEach((post) => {
    console.log(post);
    post.addEventListener("click", () => {
        post.querySelector(".status").classList.remove("not-read");
        updateNotificacion();
    });
});

if (!numberElement) {
    console.error("Element with id 'number' not found in the DOM.");
}
markall.addEventListener("click", () => {
    console.log("boton cliceado");
    const notReadElement = document.querySelectorAll(".not-read");
    notReadElement.forEach((element) => {
        element.classList.remove("not-read");
    });
    updateNotificacion();
});

const updateNotificacion = () => {
    const notreaderelemnet = document.querySelectorAll(".not-read");
    numberElement.innerText = notreaderelemnet.length;
};
