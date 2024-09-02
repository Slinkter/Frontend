//6.1
let perro = {
  user: "user",
  url: "http://www.cudpast.com/AppDoctor/Login_GETID.php?id=luis",
  send: "negro",
  input: "archivo.php",
  outout: "archivo.php",
  run() {
    console.log(`${this.user}`);
  },
};
//6.2
let usuario = [(nombre = "Luis"), (apellido = "Cueva")];

console.log(usuario[0]);
//6.3 --> eliminar una propiedad
delete perro.nombre;
perro.send = 3;

perro["nuevoAtributo"] = "hola mundo";
//6.4
let amigo = "alexander";
typeof amigo;
Object.getPrototypeOf(amigo);

let amigo2 = new String("Jhonatan");
amigo2;
typeof amigo2;
