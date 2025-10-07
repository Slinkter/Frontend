# Arquitecturas CSS: Guía de Estudio

## 1. ¿Qué es una Arquitectura CSS?

✅ **Definición:** Una arquitectura CSS es un conjunto de reglas, guías y metodologías para escribir y organizar el código CSS. Su propósito es que el código sea predecible, reutilizable, mantenible y escalable, especialmente en proyectos grandes y complejos.

Una buena arquitectura define dos aspectos clave:

1.  **Estructura de archivos:** Cómo se divide el código en carpetas y archivos (ej. `components/`, `utils/`, `base/`).
2.  **Convención de Nomenclatura:** Cómo se nombran las clases para evitar colisiones y reflejar la estructura del DOM (ej. BEM).

El objetivo final es lograr un CSS:

-   **Limpio** 🧹: Bien organizado y sin código redundante.
-   **Escalable** 📈: Preparado para crecer sin volverse un caos.
-   **Mantenible** 🔧: Fácil de modificar y depurar.

---

## 2. Principios Fundamentales

Estos principios, adaptados de la ingeniería de software, nos ayudan a escribir mejor CSS.

### DRY (Don't Repeat Yourself)

✅ **Definición:** No repitas el mismo código una y otra vez. Busca patrones y abstráelos en clases reutilizables.

📌 **Ejemplo práctico:** En lugar de repetir los estilos de `flexbox` para centrar, crea una clase de utilidad.

```css
/* ❌ Mal (Repetitivo) */
.header-nav {
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* ✅ Bien (DRY) */
.u-flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```html
<nav class="header-nav u-flex-center">...</nav>
<div class="footer-links u-flex-center">...</div>
```

### Inmutabilidad

✅ **Definición:** Un estilo, una vez definido, no debería ser modificado o sobrescrito por otro selector más específico. En su lugar, se crean nuevas clases (modificadores) para representar variaciones.

⚠️ **Errores comunes:** Usar `!important` para "forzar" un estilo o anidar selectores para aumentar la especificidad y sobrescribir reglas existentes. Esto crea una "guerra de especificidad" y hace el código impredecible.

📌 **Ejemplo práctico:** Para cambiar el color de un botón, no sobrescribas la clase base. Crea un modificador.

```css
/* ❌ Mal (Mutable, propenso a !important) */
.button {
    background-color: blue;
}
.sidebar .button {
    /* Sobrescribiendo por contexto */
    background-color: red;
}

/* ✅ Bien (Inmutable) */
.button {
    background-color: blue;
    /* ... otros estilos base */
}
.button--danger {
    /* Nueva clase para la variación */
    background-color: red;
}
```

```html
<button class="button">Botón Primario</button>
<button class="button button--danger">Botón de Peligro</button>
```

### SOLID (Adaptado a CSS)

SOLID son cinco principios de diseño de software que podemos adaptar para mejorar nuestro CSS.

1.  **S - Single Responsibility Principle (Principio de Responsabilidad Única)**

    -   **Definición:** Cada clase debe tener una única responsabilidad. Una clase de componente se encarga de la estructura del componente, y una clase de utilidad se encarga de una sola propiedad (ej. `text-align: center`).
    -   **Ejemplo:** `.card` define el contenedor, `.card__title` el título, y `.u-text-center` centra el texto. No mezcles todo en `.card`.

2.  **O - Open/Closed Principle (Principio Abierto/Cerrado)**

    -   **Definición:** Los estilos de un componente deben estar "abiertos a la extensión, pero cerrados a la modificación". Esto significa que puedes añadir nuevas apariencias (extender) sin tocar el CSS original del componente (modificar).
    -   **Ejemplo:** Usar clases modificadoras de BEM como `.card--dark` o `.button--large` para extender la funcionalidad sin alterar `.card` o `.button`.

3.  **L - Liskov Substitution Principle (Principio de Sustitución de Liskov)**

    -   **Definición:** Un componente modificado (ej. `.card--special`) debe poder usarse en cualquier lugar donde se use el componente base (`.card`) sin romper el layout o el comportamiento esperado.
    -   **Ejemplo:** Si `.card` tiene `width: 300px`, el modificador `.card--special` no debería cambiarlo a `width: 100%` si eso rompe la grilla donde se encuentra. Las variaciones deben ser consistentes.

4.  **I - Interface Segregation Principle (Principio de Segregación de Interfaces)**

    -   **Definición:** No crees clases "monolíticas" que hagan de todo. Es mejor tener muchas clases pequeñas y específicas (como las clases de utilidad) que una sola clase grande.
    -   **Ejemplo:** En lugar de una clase `.card-with-blue-title-and-centered-text`, es mejor componer con `.card`, `.card__title`, `.u-text-blue`, `.u-text-center`.

5.  **D - Dependency Inversion Principle (Principio de Inversión de Dependencias)**
    -   **Definición:** Los componentes de alto nivel no deben depender de los de bajo nivel. Ambos deben depender de abstracciones. En CSS, esta "abstracción" son los **Design Tokens** (variables CSS o de preprocesador).
    -   **Ejemplo:** En lugar de `color: #333;` y `background: #333;` en múltiples componentes, ambos deben usar una variable como `var(--color-primary-dark)`. Si el color cambia, solo modificas la variable.

---

## 3. BEM: Block, Element, Modifier

✅ **Definición:** BEM es una convención de nomenclatura que hace que las clases CSS sean informativas y desacopladas. Su objetivo es crear componentes reutilizables y evitar conflictos de estilos.

-   **Bloque (`Block`):** Un componente de UI independiente y reutilizable. Ej: `card`, `menu`, `search-form`.
-   **Elemento (`Element`):** Una parte de un bloque que no tiene sentido por sí sola. Se une al bloque con `__`. Ej: `card__image`, `menu__item`.
-   **Modificador (`Modifier`):** Una bandera que cambia la apariencia, estado o comportamiento de un bloque o un elemento. Se une con `--`. Ej: `card--dark`, `menu__item--active`.

📌 **Ejemplo práctico:**

```html
<!-- BLOQUE: card -->
<div class="card card--featured">
    <!-- ELEMENTO: card__image -->
    <img class="card__image" src="photo.jpg" alt="A beautiful landscape" />
    <!-- ELEMENTO: card__title -->
    <h2 class="card__title">Card Title</h2>
    <!-- BLOQUE anidado: button -->
    <button class="button button--primary">Read More</button>
</div>
```

```css
/* Bloque */
.card {
    display: block;
    border: 1px solid #ccc;
    border-radius: 8px;
}

/* Modificador de Bloque */
.card--featured {
    border-color: gold;
    border-width: 2px;
}

/* Elementos */
.card__image {
    width: 100%;
    height: auto;
}
.card__title {
    font-size: 1.5rem;
    margin: 0;
}

/* Bloque independiente */
.button {
    padding: 10px 15px;
}

/* Modificador de otro Bloque */
.button--primary {
    background-color: blue;
    color: white;
}
```

⚠️ **Errores comunes:**

-   **Anidar BEM:** `card__header__title` es incorrecto. Un elemento siempre es parte del bloque, no de otro elemento. Lo correcto es `card__title`.
-   **Usar selectores de etiqueta o ID con BEM:** BEM funciona mejor usando solo clases. Evita `div.card` o `#main .card__title`.
-   **Crear modificadores que no se aplican junto a la clase base:** La clase `.button--primary` debe usarse siempre con `.button` (`class="button button--primary"`), no sola.

💡 **Buenas prácticas:**

-   Un elemento siempre es opcional dentro de un bloque.
-   Puedes anidar bloques (`.card` puede contener un `.button`).
-   Los modificadores pueden alterar tanto bloques (`.card--dark`) como elementos (`.card__title--small`).

---

## 4. Arquitecturas de Organización

### OOCSS (Object-Oriented CSS)

✅ **Definición:** Una metodología pionera que promueve la reutilización de código CSS a través de dos principios clave:

1.  **Separación de estructura y apariencia (Skin):** La estructura (padding, márgenes, layout) debe estar separada de la apariencia (colores, fuentes, sombras).
2.  **Separación de contenedor y contenido:** Un componente debe verse igual sin importar dónde se coloque. Evita reglas como `.sidebar .button`.

📌 **Ejemplo práctico:**

```css
/* Estructura (Objeto reutilizable) */
.media {
    display: flex;
    align-items: flex-start;
}
.media__image {
    margin-right: 10px;
}
.media__body {
    flex: 1;
}

/* Apariencia (Skin) */
.theme-dark .media {
    background-color: #333;
    color: white;
}
```

### SMACSS (Scalable and Modular Architecture for CSS)

✅ **Definición:** SMACSS es una guía para organizar el CSS en cinco categorías, lo que facilita la ubicación y comprensión de los estilos.

1.  **Base:** Estilos por defecto para elementos HTML (`body`, `a`, `h1`). Sin clases.
2.  **Layout:** Clases que definen las grandes secciones de la página (`.l-header`, `.l-grid`). Suelen prefijarse con `l-`.
3.  **Module:** Partes reutilizables y modulares de la UI (`.card`, `.button`, `.menu`). Es el corazón de la aplicación.
4.  **State:** Clases que describen cómo se ve un módulo en un estado particular (`.is-hidden`, `.is-active`). Suelen prefijarse con `is-` o `has-`.
5.  **Theme:** Estilos que cambian la apariencia visual de los módulos o el layout (ej. un tema oscuro).

### ITCSS (Inverted Triangle CSS)

✅ **Definición:** ITCSS es una arquitectura que organiza los archivos CSS en un orden específico para gestionar la especificidad y la cascada de forma lógica. Los estilos se ordenan de genéricos a específicos, visualizados como un triángulo invertido.

1.  **Settings:** Variables globales (colores, fuentes). No produce CSS.
2.  **Tools:** Mixins y funciones. No produce CSS.
3.  **Generic:** Reset/Normalize, box-sizing. Estilos de muy bajo nivel.
    4s. **Elements:** Estilos para etiquetas HTML (`h1`, `a`).
4.  **Objects:** Clases para patrones de layout no decorados (como el objeto `.media` de OOCSS).
5.  **Components:** Los componentes de UI diseñados (`.card`, `.button`). Aquí vive la mayor parte del código.
6.  **Utilities:** Clases de alta especificidad que sobrescriben todo lo anterior (`.u-text-center`, `.u-hidden`).

💡 **Buena práctica:** La combinación de **ITCSS** para la estructura de archivos y **BEM** para el nombramiento de clases es una de las estrategias más robustas y populares en proyectos grandes.

---

## 5. Atomic Design

✅ **Definición:** Atomic Design no es una arquitectura CSS, sino una metodología para crear sistemas de diseño. Organiza los componentes en una jerarquía inspirada en la química, lo que facilita la coherencia y la reutilización.

-   **Átomos:** Los bloques de construcción más básicos. No se pueden descomponer más.
    -   _Ejemplos:_ `label`, `input`, `button`.
-   **Moléculas:** Grupos de átomos que funcionan juntos como una unidad.
    -   _Ejemplo:_ Un formulario de búsqueda (`label` + `input` + `button`).
-   **Organismos:** Componentes más complejos formados por moléculas y/o átomos.
    -   _Ejemplo:_ Un header que incluye un logo (átomo), un menú de navegación (molécula) y un formulario de búsqueda (molécula).
-   **Plantillas (Templates):** Estructuras de página que muestran cómo se organizan los organismos. Son el esqueleto sin contenido real.
    -   _Ejemplo:_ Una plantilla de artículo con placeholders para el header, el contenido y el footer.
-   **Páginas (Pages):** Instancias concretas de las plantillas con contenido real. Permiten probar el sistema de diseño en escenarios reales.
    -   _Ejemplo:_ La página "Sobre Nosotros", que usa la plantilla de página estándar con su texto e imágenes específicos.
