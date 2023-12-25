const getName = async () => {
  const container = document.querySelector(".root");
  const fragmento = document.createDocumentFragment();

  let peticion;
  let resultado;

  //
  peticion = await fetch("https://reqres.in/api/users?page=2");
  resultado = await peticion.json();
  //
  let array_data = resultado.data;
  //
  for (elemento in array_data) {
    div_first_name = document.createElement("DIV");
    div_last_name = document.createElement("DIV");
    div_email = document.createElement("DIV");

    div_first_name.classList.add("first_name");
    div_last_name.classList.add("last_name");
    div_email.classList.add("email");

    //
    div_first_name.innerHTML = array_data[elemento].first_name;
    div_last_name.innerHTML = array_data[elemento].last_name;
    div_email.innerHTML = array_data[elemento].email;

    //   div.innerHTML = array_data[elemento].avatar;

    /*     
    document.body.appendChild(div_first_name);
    document.body.appendChild(div_last_name);
    document.body.appendChild(div_email); */
    fragmento.appendChild(document.createElement("BR"));
    fragmento.appendChild(div_first_name);
    fragmento.appendChild(div_last_name);
    fragmento.appendChild(div_email);
  }
  container.append(fragmento);
};

getName();
