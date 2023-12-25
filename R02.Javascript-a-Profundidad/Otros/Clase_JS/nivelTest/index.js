const getInfoUser = async () => {
  const container = document.querySelector(".root");

  //
  const fragmento = document.createDocumentFragment();
  //
  let peticion = await fetch("https://reqres.in/api/users?page=2");
  let resultado = await peticion.json();
  let data = resultado.data;
  //
  for (item in data) {
    console.log("-----------------------------");
    br_espacio = document.createElement("br");
    h2_fn = document.createElement("H2");
    h2_ln = document.createElement("H2");
    h2_email = document.createElement("H2");
    //
    h2_fn.classList.add("first_name");
    h2_ln.classList.add("last_name");
    h2_email.classList.add("email");
    //
    h2_fn.innerHTML = data[item].first_name;
    h2_ln.innerHTML = data[item].last_name;
    h2_email.innerHTML = data[item].email;
    //
    fragmento.appendChild(br_espacio);
    fragmento.appendChild(h2_fn);
    fragmento.appendChild(h2_ln);
    fragmento.appendChild(h2_email);
    //
  }
  container.classList.add("bg_001");
  container.append(fragmento);
};

getInfoUser();
