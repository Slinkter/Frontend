const productos = [
  {
    nombre: "Pan",
    precio: 2.0,
    cantidad: 6,
    categoria: "Panadería",
    marca: "Bimbo",
  },
  {
    nombre: "Huevos",
    precio: 7.5,
    cantidad: 10,
    categoria: "Proteínas",
    marca: "Avinka",
  },
  {
    nombre: "Aceite",
    precio: 6.0,
    cantidad: 4,
    categoria: "Condimentos",
    marca: "Primor",
  },
  {
    nombre: "Azúcar",
    precio: 3.8,
    cantidad: 7,
    categoria: "Granos",
    marca: "Chiclin",
  },
  {
    nombre: "Sal",
    precio: 1.2,
    cantidad: 3,
    categoria: "Condimentos",
    marca: "Lobos",
  },
  {
    nombre: "Fideos",
    precio: 2.5,
    cantidad: 3,
    categoria: "Pasta",
    marca: "Don Vittorio",
  },
  {
    nombre: "Atún",
    precio: 5.0,
    cantidad: 2,
    categoria: "Conservas",
    marca: "Florida",
  },
];
//console.log(productos);

const copy = [...productos.sort((a, b) => b.cantidad - a.cantidad)];
console.log(copy);
