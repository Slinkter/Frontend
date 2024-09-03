https://jguevaral.notion.site/Curso-de-React-js-Navegaci-n-con-React-Router-005ddbfb5d024e9e985f2f99df30a2b3

- crear app
  npx create-react-app appweb04
- dependencia
  npm install --save react-router-dom

## BrowserRouter vs. HashRouter vs Memory Router

### Browser Router:

Su navegación funciona por medio de los Slash / que indican en que página de la aplicación estamos. Este lo usamos si tenemos una ubicación de otro HTML cargado en el backend, si no lo encuentra retorna un Error 404.

### Hast Router:

Su navegación funciona por medio de los Slash Hashes y Slash /#/, esto nos puede servir para renderizar contenido guiándonos con los hash gracias a JavaScript. Este no nos saca del index.html, esto nos sirve para crear páginas SPA.

### Memory Router:

Funciona por medio de un Array de rutas que nos indica en que ruta estamos y renderizar ese contenido. Se suele usar para aplicaciones móviles para cambiar de vistas.

## Route: componentes de navegación

## Link vs. NavLink

- cuando se usa la etiqueta a manda una peticion al servidor para que se descarque el HTML
- con <Link> nos ayuda

## useNavigate

- historial de navegación

## Outlet: nested routes

- nested , es una palabra de cosas que estran dentro otras cosas , CSS
- nested routes , rutas dentro de rutas
- este componente nos permite renderizar mas de 2 rutas
-
