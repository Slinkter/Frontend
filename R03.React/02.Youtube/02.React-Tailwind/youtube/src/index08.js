const inputCheckbox = document.querySelector("#idCheckbox");
inputCheckbox.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

const label = document.querySelector("#idLabel");
label.addEventListener("click", () => {
    alert("esto es un click");
});
console.log(inputCheckbox);
