# Ejemplos Prácticos: Objetos Avanzados

## 1. Sintaxis Mejorada de Literales de Objeto (ES6)

Estas mejoras hacen que la creación de objetos sea mucho más limpia y concisa.

```javascript
// Ejemplo 1: Shorthand properties y methods
function crearUsuario(nombre, email) {
  const id = Math.random().toString(36).substr(2, 9);
  
  return {
    // Shorthand property: equivale a 'nombre: nombre'
    nombre,
    email,
    id,
    
    // Shorthand method: equivale a 'saludar: function() { ... }'
    saludar() {
      return `Hola, soy ${this.nombre}`;
    },

    // Computed property name: la clave del objeto se calcula dinámicamente
    ['rol_' + id]: 'usuario'
  };
}

const usuario1 = crearUsuario('Marta', 'marta@email.com');
console.log(usuario1);
console.log(usuario1.saludar());
```

## 2. Desestructuración de Objetos

La desestructuración es fundamental para acceder a las propiedades de un objeto de forma legible.

```javascript
const config = {
  theme: 'dark',
  api: {
    host: 'api.example.com',
    port: 443,
    useSSL: true
  },
  features: ['notifications', 'dashboard']
};

// Ejemplo 2: Desestructuración básica con renombramiento y valores por defecto
const {
  theme,
  version = '1.0.0', // Valor por defecto, ya que 'version' no existe en 'config'
  api: apiConfig // Renombramos 'api' a 'apiConfig' para evitar conflictos
} = config;

console.log(theme); // 'dark'
console.log(version); // '1.0.0'
console.log(apiConfig); // { host: '...', port: ..., useSSL: ... }

// Ejemplo 3: Desestructuración anidada
const { api: { host } } = config;
console.log(`Conectando a: ${host}`); // Conectando a: api.example.com

// Ejemplo 4: Desestructuración en parámetros de función
// La función solo toma las propiedades que necesita del objeto que se le pasa.
function mostrarNotificaciones({ features, theme: temaVisual }) {
  if (features.includes('notifications')) {
    console.log(`Mostrando notificaciones en tema ${temaVisual}.`);
  }
}
mostrarNotificaciones(config); // Mostrando notificaciones en tema dark.
```

## 3. Operadores Spread (`...`) y Rest (`...`)

Estos operadores son clave para la manipulación inmutable de objetos.

```javascript
// Ejemplo 5: Copiar y fusionar objetos con Spread
const defaults = { color: 'azul', tamaño: 'M' };
const custom = { tamaño: 'L', precio: 25 };

// 'custom' sobreescribe las propiedades de 'defaults' que coinciden
const productoFinal = { ...defaults, ...custom };
console.log(productoFinal); // { color: 'azul', tamaño: 'L', precio: 25 }

// Ejemplo 6: Actualización inmutable
const estadoInicial = { loading: false, data: null, error: false };
const estadoCargando = { ...estadoInicial, loading: true };
console.log(estadoCargando); // { loading: true, data: null, error: false }
console.log(estadoInicial); // El original no cambia

// Ejemplo 7: Usar Rest para "quitar" propiedades
const usuarioCompleto = {
  id: 123,
  nombre: 'Pedro',
  email: 'pedro@test.com',
  password: 'hash-secreto'
};

// Queremos un objeto de usuario sin el password para enviarlo al frontend
const { password, ...usuarioSeguro } = usuarioCompleto;

console.log(password); // 'hash-secreto'
console.log(usuarioSeguro); // { id: 123, nombre: 'Pedro', email: 'pedro@test.com' }
```

## 4. Iterar sobre Propiedades de Objetos

`Object.entries()` es la forma más moderna y flexible de recorrer las propiedades de un objeto.

```javascript
// Ejemplo 8: Mostrar las propiedades de un objeto
const coche = {
  marca: 'Ford',
  modelo: 'Mustang',
  año: 1969
};

console.log('Claves:', Object.keys(coche));   // ['marca', 'modelo', 'año']
console.log('Valores:', Object.values(coche)); // ['Ford', 'Mustang', 1969]

// Usando Object.entries con desestructuración en un bucle for...of
for (const [clave, valor] of Object.entries(coche)) {
  console.log(`- ${clave}: ${valor}`);
}
// - marca: Ford
// - modelo: Mustang
// - año: 1969
```
