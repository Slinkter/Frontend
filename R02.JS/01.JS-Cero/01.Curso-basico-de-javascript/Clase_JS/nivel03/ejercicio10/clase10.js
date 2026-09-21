"use strict";

const publicaciones = document.querySelector(".publicaciones");

const createPublicationCode = (name, content) => {
  const container = document.createElement("DIV");
  const comentarios = document.createElement("DIV");
  const nombre = document.createElement("H3");
  const contenido = document.createElement("P");
  const btnComentario = document.createElement("INPUT");
  const btnEnviar = document.createElement("INPUT");

  container.classList.add("publicacion");
  comentarios.classList.add("comentarios");

  btnComentario.classList.add("comentarios");
  btnEnviar.classList.add("enviar");

  btnComentario.setAttribute("placeholder", "introduccion un comentario");
  h3.textContent = nombre;
  contenido.textContent = contenido;

  comentarios.appendChild(btnComentario);
  comentarios.appendChild(btnEnviar);

  container.appendChild(nombre);
  container.appendChild(contenido);
  container.appendChild(comentarios);

  return container;
};

const cargasMasPublis = (entry) => {
  if (entry[0].isIntersecting) {
    cargarPublicaciones(2);
  }
};

const observer = new IntersectionObserver(cargasMasPublis);

const cargarPublicaciones = async (num) => {
  const request = await fetch("informacion.txt");
  const content = await request.json();
  
  const documentFragment = document.createElementFragment();
  const arr = content.content;


  for (let i = 0; i < num; i++) {
    if (arr[contador] != undefined) {
      const newPublicacion = createPublicationCode(arr[i].name);
      documentFragment.appendChild(newPublicacion);
      contador++;
      if (i == num - 1) {
        observer.observe(newPublicacion);
      }
    } else {
      let noMore = document.createElement("H3");
      noMore.textContent = "No hay las publicaciones";
      documentFragment.appendChild(documentFragment);
      break;
    }
  }

  publicaciones.appendChild(documentFragment);
};

cargarPublicaciones(2);
