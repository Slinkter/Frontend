# Ejemplos: Métodos de Arrays

## 1. La Trinidad: Map, Filter, Reduce

Tenemos un carrito de compras:

```javascript
const carrito = [
  { id: 1, nombre: "Camisa", precio: 500, categoria: "Ropa" },
  { id: 2, nombre: "Zapatos", precio: 2000, categoria: "Ropa" },
  { id: 3, nombre: "Celular", precio: 15000, categoria: "Electrónica" },
  { id: 4, nombre: "Gorra", precio: 300, categoria: "Ropa" },
];
```

### Map: Obtener lista de nombres

```javascript
const nombres = carrito.map((item) => item.nombre);
console.log(nombres); // ["Camisa", "Zapatos", "Celular", "Gorra"]
```

### Filter: Obtener solo Ropa

```javascript
const ropa = carrito.filter((item) => item.categoria === "Ropa");
// [{Camisa...}, {Zapatos...}, {Gorra...}]
```

### Reduce: Calcular total a pagar

```javascript
// acumulador inicia en 0 (segundo argumento)
const total = carrito.reduce((acumulador, item) => {
  return acumulador + item.precio;
}, 0);

console.log(total); // 17800
```

## 2. Encadenamiento (Chaining)

Combina métodos para operaciones complejas muy legibles.
_Objetivo:_ Obtener el precio total de la "Ropa" aplicando un 10% de descuento.

```javascript
const totalRopaDescuento = carrito
  .filter((item) => item.categoria === "Ropa") // 1. Filtrar ropa
  .map((item) => item.precio) // 2. Extraer precios
  .map((precio) => precio * 0.9) // 3. Aplicar descuento
  .reduce((acc, precio) => acc + precio, 0); // 4. Sumar

console.log(totalRopaDescuento); // 2520
```

## 3. Flat y FlatMap

Manejo de arrays anidados.

```javascript
const ordenes = [
  { usuario: 1, productos: ["manzana", "pera"] },
  { usuario: 2, productos: ["uvas"] },
];

// Obtener lista plana de todos los productos vendidos
const todosLosProductos = ordenes.flatMap((orden) => orden.productos);
console.log(todosLosProductos); // ["manzana", "pera", "uvas"]
```
