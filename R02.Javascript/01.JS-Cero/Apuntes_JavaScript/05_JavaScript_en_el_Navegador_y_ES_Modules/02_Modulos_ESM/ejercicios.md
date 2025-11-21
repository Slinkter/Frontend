# Ejercicios Propuestos: Módulos de ES (ESM)

Para estos ejercicios, deberás crear los archivos `.js` correspondientes y un `index.html` con `<script type="module">` para probarlos en un servidor local.

## Ejercicio 1: Refactorización a Módulos

**Objetivo:** Tomar un único script monolítico y refactorizarlo en módulos con responsabilidades separadas.

**Instrucciones:**
Tienes el siguiente código en un solo archivo. Tu tarea es dividirlo en tres módulos:
1.  `config.js`: Debe exportar el objeto `configuracion`.
2.  `api.js`: Debe importar la configuración, y exportar una función `fetchData` que simula una petición usando la URL de la configuración.
3.  `main.js`: Debe importar `fetchData` y ejecutarla.

**Código Original (todo en un solo archivo):**
```javascript
const configuracion = {
  apiUrl: 'https://api.miapi.com/v1',
  timeout: 5000
};

function fetchData(endpoint) {
  return new Promise(resolve => {
    const url = `${configuracion.apiUrl}/${endpoint}`;
    console.log(`Pidiendo datos a: ${url}`);
    setTimeout(() => {
      resolve({ success: true, data: `Datos de ${endpoint}` });
    }, 1000);
  });
}

async function app() {
  const userData = await fetchData('users');
  console.log(userData);
}

app();
```

<details>
<summary>Solución Razonada</summary>

### `config.js`
Este módulo solo tiene una responsabilidad: definir y exportar la configuración.

```javascript
// Archivo: config.js
export const configuracion = {
  apiUrl: 'https://api.miapi.com/v1',
  timeout: 5000
};
```

### `api.js`
Este módulo se encarga de la lógica de la API. Depende de `config.js`.

```javascript
// Archivo: api.js

// 1. Importa la dependencia que necesita.
import { configuracion } from './config.js';

// 2. Exporta la función que otros módulos pueden usar.
export function fetchData(endpoint) {
  return new Promise(resolve => {
    const url = `${configuracion.apiUrl}/${endpoint}`;
    console.log(`Pidiendo datos a: ${url}`);
    setTimeout(() => {
      resolve({ success: true, data: `Datos de ${endpoint}` });
    }, 1000);
  });
}
```

### `main.js`
Este es el punto de entrada de la aplicación. Orquesta la lógica.

```javascript
// Archivo: main.js

// 1. Importa la funcionalidad que necesita de su dependencia.
import { fetchData } from './api.js';

// 2. Define la lógica principal de la aplicación.
async function app() {
  console.log('Iniciando la aplicación...');
  const userData = await fetchData('users');
  console.log('Datos recibidos:', userData);
}

// 3. Ejecuta la aplicación.
app();
```

### `index.html`
El HTML que carga el módulo principal.

```html
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="main.js"></script>
</body>
</html>
```

**Explicación:**
Hemos separado con éxito el código en módulos con una única responsabilidad (Single Responsibility Principle).
-   `config.js` contiene solo datos de configuración. Si necesitamos cambiar la URL de la API, solo editamos este archivo.
-   `api.js` contiene solo la lógica para comunicarse con la API. Es reutilizable.
-   `main.js` contiene la lógica de la aplicación de alto nivel, sin preocuparse por los detalles de implementación de la API o la configuración.

Esta estructura es mucho más mantenible, escalable y fácil de testear que el script monolítico original.
</details>

---

## Ejercicio 2: Carga Condicional con Importación Dinámica

**Objetivo:** Utilizar la importación dinámica (`import()`) para cargar un módulo solo cuando sea necesario.

**Instrucciones:**
Imagina que tienes una funcionalidad de "exportar a PDF" que es muy pesada y no todos los usuarios la necesitan. Tu tarea es cargar el módulo que contiene esta funcionalidad solo cuando el usuario haga clic en un botón "Exportar".

1.  Crea un módulo `exportador.js` que exporte una función `exportarAPDF`. Esta función puede simplemente imprimir un mensaje en la consola.
2.  En tu `main.js`, añade un listener a un botón. Cuando se haga clic, utiliza la importación dinámica para cargar `exportador.js` y luego llama a la función `exportarAPDF`.

**HTML de base:**
```html
<button id="export-btn">Exportar a PDF</button>
<div id="content">Contenido a exportar...</div>
```

<details>
<summary>Solución Razonada</summary>

### `exportador.js`
Este módulo contiene la funcionalidad "pesada" que queremos cargar bajo demanda.

```javascript
// Archivo: exportador.js

console.log('--- Módulo Exportador Cargado --- (Este mensaje solo debe aparecer una vez)');

export function exportarAPDF(contenido) {
  console.log(`Exportando a PDF el siguiente contenido: "${contenido}"`);
  // Aquí iría la lógica real de una librería pesada como jsPDF
}
```

### `main.js`
Este módulo añade la interactividad y gestiona la carga dinámica.

```javascript
// Archivo: main.js

const exportButton = document.querySelector('#export-btn');
const contentDiv = document.querySelector('#content');

exportButton.addEventListener('click', async () => {
  console.log('Botón de exportar clickeado. Iniciando carga del módulo...');
  
  // Desactivamos el botón para evitar múltiples clics mientras se carga.
  exportButton.disabled = true;
  exportButton.textContent = 'Exportando...';

  try {
    // 1. Usamos import() que devuelve una promesa.
    // El navegador descargará y ejecutará 'exportador.js' solo en este momento.
    const exportadorModule = await import('./exportador.js');
    
    // 2. Una vez que la promesa se resuelve, el módulo está disponible.
    // Accedemos a la función exportada.
    const { exportarAPDF } = exportadorModule;
    
    // 3. Llamamos a la función.
    exportarAPDF(contentDiv.textContent);
    
  } catch (error) {
    console.error('Error al cargar el módulo de exportación:', error);
    alert('No se pudo cargar la funcionalidad de exportación.');
  } finally {
    // Reactivamos el botón.
    exportButton.disabled = false;
    exportButton.textContent = 'Exportar a PDF';
  }
});
```

**Explicación:**

1.  Al cargar la página inicialmente, el navegador solo descarga y ejecuta `main.js`. El archivo `exportador.js` es ignorado por completo. Esto hace que la carga inicial de la página sea mucho más rápida.
2.  Solo cuando el usuario interactúa con el botón "Exportar", se ejecuta la expresión `import('./exportador.js')`.
3.  El navegador entonces realiza una petición de red para `exportador.js`.
4.  Una vez descargado, el `await` termina, y el módulo (`exportadorModule`) está disponible con sus exportaciones.
5.  Podemos entonces llamar a `exportarAPDF`. Si vuelves a hacer clic en el botón, el navegador no volverá a descargar el archivo, ya que lo tiene en caché, pero el `import()` se resolverá inmediatamente con el módulo ya cargado.

Este patrón de **Code Splitting** o "división de código" es esencial para el rendimiento de las aplicaciones web a gran escala.
</details>
