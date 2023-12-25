"use strict";
/*

let count_textura = document.querySelector(".texturas").children.length;
const zona = document.querySelector(".zona");

zona.addEventListener("dragover", (e) => {
  console.log("4");
  e.preventDefault();
});

zona.addEventListener("drop", (e) => {
  console.log("3");
  let n = e.dataTransfer.getData("textura");
  zona.style.background = `url("./img/textura${n}.jpg") `;
});

for (let i = 1; i < count_textura + 1; i++) {
  console.log("2");
  document.querySelector(`.textura${i}`).addEventListener("dragstart", (e) => {
    console.log("5");
    transferirTextura(i, e);
  });
}

const transferirTextura = (n, e) => {
  console.log("1");
  e.dataTransfer.setData("textura", n);
};


*/
//
const input_archivo = document.getElementById("archivo");
//
input_archivo.addEventListener("change", (e) => {
  let file = input_archivo.files[0];
  func_ReaderFile(file);
});
//
const func_ReaderFile = (file_element) => {
  //
  const reader = new FileReader();
  reader.readAsText(file_element);
  reader.addEventListener("load", (e) => {
    // convertir de texto a json
    let array_data = JSON.parse(e.currentTarget.result);
    //
    for (let element in array_data) {
      //
      let id = array_data[element].id;
      let name = array_data[element].name;
      let username = array_data[element].username;
      let mail = array_data[element].email;
      //
      document.write(`<br> ===== ${id} ===== <br> `);
      document.write(`Name  : ${name}<br> `);
      document.write(`Username  : ${username}<br> `);
      document.write(`Email  : ${mail}<br> `);
    }
  });
};
