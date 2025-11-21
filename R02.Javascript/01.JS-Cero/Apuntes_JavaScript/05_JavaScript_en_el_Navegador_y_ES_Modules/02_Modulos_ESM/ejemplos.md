# Ejemplos Prácticos: Módulos de ES (ESM)

Para este tema, se han creado tres archivos JavaScript (`utils.js`, `user.js`, `main.js`) y un archivo `index.html` que los utiliza. El concepto clave es cómo se exporta e importa la funcionalidad entre ellos.

**Para probar este ejemplo:**
Abre el archivo `index.html` en un navegador web. No funcionará abriendo el archivo localmente (`file://...`) en todos los navegadores debido a las políticas de seguridad CORS. Necesitas servirlo a través de un servidor web local (por ejemplo, con la extensión "Live Server" de VS Code).

---

### `utils.js`: Exportaciones Nombradas

Este módulo exporta varias utilidades, cada una con su propio nombre. Este es un patrón muy común para librerías de funciones.

```javascript
// Contenido de: utils.js

// Exportación Nombrada (Named Export)
export const PI = 3.14159;

export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}
```

---

### `user.js`: Exportación por Defecto

Este módulo se centra en una única pieza de funcionalidad: la clase `User`. Por lo tanto, usa una exportación por defecto.

```javascript
// Contenido de: user.js

// Exportación por Defecto (Default Export)
export default class User {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return `Hola, mi nombre es ${this.nombre}`;
  }
}
```

---

### `main.js`: El Módulo Principal que Importa Todo

Este es el punto de entrada de nuestra aplicación. Importa el código que necesita de los otros módulos y lo utiliza.

```javascript
// Contenido de: main.js

// 1. Importación Nombrada de 'utils.js'
import { PI, sumar, restar as diferencia } from './utils.js';

// 2. Importación por Defecto de 'user.js'
import Usuario from './user.js';

// 3. Importación de Espacio de Nombres (Namespace)
import * as utilsCompletas from './utils.js';

// ... (código que usa las importaciones) ...

// 4. Importación Dinámica
// (ver el código completo en el archivo main.js)
// Se usa import() para cargar un módulo bajo demanda.
```

### `index.html`: Cargando el Módulo en el Navegador

El `index.html` es muy simple. La parte crucial es la etiqueta `<script>`:

```html
<!-- Contenido de: index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Ejemplos Módulos ES</title>
</head>
<body>
  <h1>Ejemplos de Módulos de ES (ESM)</h1>
  <p>Abre la consola para ver los resultados.</p>

  <!-- La clave es type="module" -->
  <script type="module" src="main.js"></script>
</body>
</html>
```
El atributo `type="module"` le indica al navegador que:
1.  Trate `main.js` como un módulo de ES.
2.  Descargue y parsee `main.js`, y a su vez, resuelva sus sentencias `import` (`./utils.js`, `./user.js`) y descargue esos módulos también.
3.  Ejecute el código en modo estricto.
4.  No contamine el scope global.

Al abrir `index.html` en un navegador (a través de un servidor local) y mirar la consola, verás cómo `main.js` utiliza exitosamente el código definido en los otros archivos, demostrando el sistema de módulos en acción.
