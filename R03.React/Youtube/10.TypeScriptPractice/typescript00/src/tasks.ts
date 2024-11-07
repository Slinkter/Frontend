const btn = document.querySelector<HTMLButtonElement>(".test-btn")!;


btn?.addEventListener("click", () => {
    console.log("hola");
})


if (btn) {
    btn.disabled = true
}


/*

 */

