### Metodo static

- para acceder a un metodo o atributo se tiene q crear una instancia de una clase o prototipo
- la forma de saltar esto es con metodos Static
- ejemplo

```js
class Patito {
  static sonidito = "cuak!";

  static hacerSonidito() {
    return "cuak! x2";
  }
}

// Por fuera de clase Patito, podemos acceder a lo siguiente sin crear alguna instancia:
// Al atributo `sonidito`
console.log(Patito.sonidito);

// Al método `hacerSonidito`
console.log(Patito.hacerSonidito());
```

### Super-Prototipo Object

- la madre de todos los prototipos es Object

```js
const objetito = {
  name: "Juanito",
  email: "juanito@frijolitos.io",
  age: 18,
};

console.log(Object.keys(objetito)); // devueve una array con nombreClave
console.log(Object.getOwnPropertyNames(objetito)); // mismo resultado pero con mas datos
//  [ 'name', 'email', 'age' ]
```

```js
const objetito = {
  name: "Juanito",
  email: "juanito@frijolitos.io",
  age: 18,
};

console.log(Object.entries(objetito));

/*  en consola:
[
  [ 'name', 'Juanito' ],
  [ 'email', 'juanito@frijolitos.io' ],
  [ 'age', 18 ]
]
*/
```

```js
// metodo estatico

const objetito = {
  name: "Juanito",
  email: "juanito@frijolitos.io",
  age: 18,
};

console.log(Object.getOwnPropertyDescriptors(objetito));
// devuelve un objecto, js limita el acceso
//Estas 3 propiedades son usadas por JavaScript internamente para indicar el límite de acceso y modificación que tiene un objeto
{
  name: {
    value: 'Juanito',
    writable: true,
    enumerable: true,
    configurable: true
  },
  email: {
    value: 'juanito@frijolitos.io',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
		value: 18,
		writable: true,
		enumerable: true,
		configurable: true
	}
}
```

## Clase 03/20 : Métodos estáticos del prototipo Object

codigo

## Clase 04/20 :Object.defineProperty

codigo

## Clase 05 /20 :Cómo funciona la memoria en JavaScript

codigo

## Clase 06 /20 :Shallow copy en JavaScript

codigo
