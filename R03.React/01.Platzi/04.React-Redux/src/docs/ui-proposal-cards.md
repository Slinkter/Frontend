# Propuesta de Refinamiento UI/UX (Cards & Layout)

## 1. CarouselItem (Tarjeta)

### Estado Actual vs Propuesta

| Propiedad | Actual | Propuesta (Refinada) | Beneficio UX |
| :--- | :--- | :--- | :--- |
| **Overlay** | Gradiente Negro Opaco | `rgba(0,0,0,0.6)` + `backdrop-filter: blur(4px)` | Mejora legibilidad y moderniza estética (Glassmorphism sutil). |
| **Typography (Meta)** | 8px | 12px (mínimo) | Legibilidad crítica para accesibilidad. |
| **Padding** | 10px | 15px | Mejor aire alrededor del texto. |
| **Hover** | Solo opacidad | Opacidad + Sutil `translateY(-5px)` | Feedback táctil más claro. |
| **Sombra** | Ninguna | `box-shadow: 0 4px 15px rgba(0,0,0,0.3)` (en hover) | Profundidad y jerarquía. |

## 2. Header

### Propuesta
- **Background:** Cambiar `#8f57fd` (sólido) por `rgba(143, 87, 253, 0.95)` + `backdrop-filter: blur(10px)`.
- **Posición:** Sticky top para facilitar navegación persistente.
- **Sombra:** Añadir sombra ligera inferior para separar del contenido.

## 3. Categories (Títulos)

### Propuesta
- Eliminar background sólido del título para que flote limpio sobre el contenido o mantenerlo con transparencia.
- Alinear a la izquierda (más estándar en lectura occidental) en lugar de centrado absoluto.

## Reglas de Implementación
1.  **No romper el layout:** Mantener dimensiones de 200x250px.
2.  **Transiciones suaves:** Mantener `450ms` o ajustar a `300ms` (más ágil).
3.  **Cross-browser:** Asegurar fallback de color para navegadores sin soporte de `backdrop-filter`.
