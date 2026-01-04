# Ejemplos: Clases y Prototipos

## 1. Sintaxis de Clase vs Prototipo (El Antes y Después)

### Estilo Antiguo (ES5)

```javascript
function Animal(nombre) {
  this.nombre = nombre;
}

Animal.prototype.hacerSonido = function () {
  console.log("Sonido genérico");
};

const perro = new Animal("Firulais");
```

### Estilo Moderno (ES6)

```javascript
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log("Sonido genérico");
  }
}
```

## 2. Herencia y Polimorfismo

```javascript
class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre); // Llama al constructor de Animal
    this.raza = raza;
  }

  // Polimorfismo: Sobreescritura
  hacerSonido() {
    console.log("Guau!");
  }

  // Llamar al padre explícitamente
  hacerSonidoOriginal() {
    super.hacerSonido();
  }
}

const miPerro = new Perro("Rex", "Pastor");
miPerro.hacerSonido(); // "Guau!"
miPerro.hacerSonidoOriginal(); // "Sonido genérico"
```

## 3. Campos Privados (#)

```javascript
class Cuenta {
  #saldo = 0; // Privado real

  constructor(depositoInicial) {
    this.#saldo = depositoInicial;
  }

  verSaldo() {
    return this.#saldo;
  }
}

const c = new Cuenta(100);
console.log(c.verSaldo()); // 100
// console.log(c.#saldo); // SyntaxError: Private field '#saldo' must be declared
```
