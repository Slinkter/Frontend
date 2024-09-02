"use strict";
//
const cajas = document.querySelectorAll(".caja");
//
const func_verifyVisibility = (entries) => {
  for (const item of entries) {
    if (item.isIntersecting) {
      console.log(item);
      console.log(item.target);
      console.log("se esta viendo la ", item.target.textContent);
    }
  }
};
//
const observer = new IntersectionObserver(func_verifyVisibility);
//
for (const caja of cajas) {
  observer.observe(caja);
}
