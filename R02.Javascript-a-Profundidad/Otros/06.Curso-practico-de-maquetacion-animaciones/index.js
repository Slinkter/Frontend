const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".modal-content__close");

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

button1.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("visible");
});

closeIcon.addEventListener("click", () => {
  modal.classList.remove("visible");
  modal.classList.add("hidden");
});
