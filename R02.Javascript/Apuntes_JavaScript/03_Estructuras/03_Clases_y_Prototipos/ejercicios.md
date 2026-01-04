# Ejercicios: Clases

## Ejercicio 1: Crear una Clase

Crea una clase `Estudiante` que herede de `Persona`.

- `Persona` tiene `nombre` y `edad`.
- `Estudiante` tiene `carrera` y un método `aprobarMateria(materia)` que agrega la materia a un array de materias aprobadas.

```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  presentarse() {
    return `Hola, soy ${this.nombre}`;
  }
}

// Tu código aquí
```

<details>
<summary>Ver Solución</summary>

```javascript
class Estudiante extends Persona {
  constructor(nombre, edad, carrera) {
    super(nombre, edad);
    this.carrera = carrera;
    this.materiasAprobadas = [];
  }

  aprobarMateria(materia) {
    this.materiasAprobadas.push(materia);
  }
}
```

</details>

## Ejercicio 2: Prototipos Manuales

Agrega un método `esAdulto` al prototipo de `Estudiante` (o `Persona`) _después_ de haber definido la clase, que retorne `true` si `edad >= 18`.

```javascript
// Usando la clase del ejercicio anterior
const juan = new Estudiante("Juan", 20, "Sistemas");

// Tu código para agregar el método al prototipo
```

<details>
<summary>Ver Solución</summary>

```javascript
Persona.prototype.esAdulto = function () {
  return this.edad >= 18;
};

// Funciona incluso para instancias ya creadas
console.log(juan.esAdulto()); // true
```

</details>
