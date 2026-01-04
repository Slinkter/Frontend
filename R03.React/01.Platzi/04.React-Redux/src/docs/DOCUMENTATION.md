# Documentación Técnica del Proyecto

## 1. Alcance y Arquitectura
Este proyecto es una SPA (Single Page Application) de streaming de video, construida con React, Redux y Tailwind CSS.

### Stack Tecnológico
- **Core:** React 18 + Vite
- **Estado:** Redux + React-Redux
- **Estilos:** Tailwind CSS (Utility-First)
- **Routing:** React Router DOM v6
- **Linting:** ESLint Standard

### Arquitectura de Componentes
El proyecto sigue una arquitectura **Container/Presentation**:
- **Containers (`/containers`):** Manejan la lógica, conexión con Redux y estado de página.
- **Components (`/components`):** Componentes puros de presentación (UI), reciben props y renderizan.

## 2. Decisiones de Diseño (UX/UI)
Se migró de SASS a **Tailwind CSS** para garantizar:
- **Consistencia:** Uso de tokens de diseño para colores y espaciado.
- **Grid System:** Layouts robustos con Flexbox y Grid.
- **Mobile First:** Todo el diseño parte de móvil y escala a desktop (`md:`, `lg:`).

### Sistema de Diseño
- **Colores:**
  - `brand-primary`: #8f57fd (Main Purple)
  - `brand-dark`: #0d0d0d (Backgrounds)
- **Tipografía:** 'Muli' (Google Fonts).

## 3. Instrucciones de Desarrollo
### Instalación
```bash
pnpm install
```

### Ejecución
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

## 4. Convenciones
- **Naming:** PascalCase para componentes, camelCase para funciones/vars.
- **Estructura:** Todo el código fuente vive en `src/`.
- **Imports:** Se priorizan rutas limpias.

---
*Documento generado por Arquitecto Frontend Senior.*
