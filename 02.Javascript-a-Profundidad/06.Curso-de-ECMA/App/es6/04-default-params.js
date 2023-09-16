function newUser(name, age, country) {
  var name = name || "Ferney";
  var age = age || 24;
  var country = country || "Peru";
  console.log("name : ", name);
  console.log("age:", age);
  console.log("country: ", country);
}

newUser();
newUser("Camila", 24, "MX");

//Es6

function newAdmin(name = "Ferney", age = 32, country = "CL") {
  console.log("name : ", name);
  console.log("age:", age);
  console.log("country: ", country);
}

newAdmin();
newAdmin("Ana", 28, "PE");
