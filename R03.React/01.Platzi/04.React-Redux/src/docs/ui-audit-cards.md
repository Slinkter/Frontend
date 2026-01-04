# Auditoría Visual de Componentes (Cards & Layout)

## 1. CarouselItem (Tarjeta Principal de Video)

**Estructura:**
- **Contenedor:** `.carousel-item` (Posición relativa, inline-block).
- **Imagen:** `.carousel-item__img` (Cover, object-fit).
- **Detalles (Overlay):** `.carousel-item__details` (Posición absoluta, gradiente).
  - Header: Iconos de acción (Play, Add/Remove).
  - Body: Título (`.carousel-item__details--title`).
  - Footer: Subtítulos/Metadata (`.carousel-item__details--subtitle`).

**Propiedades Visuales:**
- **Dimensions:** 200px x 250px.
- **Border Radius:** 20px.
- **Background/Overlay:** Linear Gradient (`rgba(0, 0, 0, 0.9)` bottom -> `rgba(0, 0, 0, 0)` top).
- **Blur/Glass:** NO TIENE. Es un overlay oscuro estándar.
- **Opacity:** 0 (oculto) -> 1 (hover). Transición de 450ms.
- **Typography:**
  - Title: Color blanco, sin tamaño explícito (hereda).
  - Subtitle: 8px (CRITICO: Muy pequeño).
- **Spacing:** Padding 10px en el contenedor de detalles.

**Comportamiento:**
- `hover`: Escala/Desplaza elementos hermanos (`transform: translate3d`).
- `hover`: Muestra detalles (`opacity: 1`).

## 2. Header (Barra de Navegación)

**Estructura:**
- Flex container con logo a la izquierda y menú a la derecha.

**Propiedades Visuales:**
- **Height:** 100px.
- **Background:** `#8f57fd` (Sólido).
- **Spacing:** Margin lateral de 30px.
- **Blur/Glass:** NO TIENE.

## 3. Categories (Título de Sección)

**Propiedades Visuales:**
- **Background:** `#8f57fd` (Mismo color que fondo global, redundante).
- **Typography:** 16px, blanco, centrado.
- **Posicionamiento:** Absolute con `margin-top: -16px` (Hack de posicionamiento).

---

**Diagnóstico General:**
La interfaz usa un estilo "Flat" con bordes redondeados. No implementa "Glassmorphism" real (uso de `backdrop-filter` o bordes semitransparentes). La jerarquía visual sufre por tamaños de fuente pequeños y falta de contraste en superposiciones.
