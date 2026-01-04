# Clase 01: Web APIs y el DOM

JavaScript en el navegador no vive aislado; interactúa con el entorno a través de las Web APIs.

## 1. DOM (Document Object Model)

El DOM es una representación en memoria del HTML de una página, estructurada como un árbol de objetos. Permite a JS leer y manipular el contenido, estructura y estilos del documento.

### Selección de Elementos

- `document.getElementById('id')`: El más rápido.
- `document.querySelector('selector')`: El más flexible (acepta selectores CSS). Devuelve el primer match.
- `document.querySelectorAll('selector')`: Devuelve una `NodeList` (parecido a un array) con todos los matches.

### Manipulación

- `elemento.textContext`: Texto plano (seguro contra XSS).
- `elemento.innerHTML`: Parsea string como HTML (peligroso por XSS).
- `elemento.classList`: API cómoda para manejar clases (`add`, `remove`, `toggle`).
- `elemento.setAttribute/getAttribute`: Atributos HTML.

## 2. Fetch API

Interfaz moderna para realizar peticiones HTTP asíncronas. Reemplaza al antiguo `XMLHttpRequest` (AJAX).

- Retorna una Promesa que resuelve a un objeto `Response`.
- **Importante:** Fetch solo rechaza la promesa por errores de red (DNS, sin conexión). Errores HTTP (404, 500) se consideran éxito en la promesa, por lo que hay que verificar `response.ok`.

## 3. Storage APIs

Mecanismos para persistir datos en el navegador del usuario.

### 3.1 LocalStorage

- Almacenamiento persistente (no expira al cerrar navegador).
- Scope: Origen (Protocolo + Dominio + Puerto).
- Capacidad: ~5-10MB.
- Sincrónico (bloqueante).

### 3.2 SessionStorage

- Similar a LocalStorage, pero los datos mueren al cerrar la pestaña/sesión.

### 3.3 Cookies

- Datos pequeños (4KB) que se envían al servidor en cada petición HTTP.
- Principalmente para autenticación (Session ID).

## 4. Intersection Observer API

API de alto rendimiento para detectar asíncronamente cuándo un elemento entra o sale del viewport (pantalla).

- Usos: Lazy loading de imágenes, Scroll infinito, animaciones al hacer scroll.
