
const contenedor = document.querySelector(".contenedor");
const fragmento = document.createDocumentFragment();
const text = document.createTextNode("Item 1");
const item = document.createElement("LI");
contenedor.style.background = "red";
item.appendChild(text);
item.style.background = "yellow";
contenedor.appendChild(item);
//
for (let i = 0; i < 5; i++) {
  const element = document.createElement("LI");
  element.innerHTML = `Este es un item de la lista ${i}`;
  element.style.background = "green";
  fragmento.appendChild(element);
}
//
contenedor.appendChild(fragmento);
//
const primierhijo = contenedor.firstElementChild;
const ultimohijo = contenedor.lastElementChild;
const hijos = contenedor.childNodes;
const array = [...hijos];
