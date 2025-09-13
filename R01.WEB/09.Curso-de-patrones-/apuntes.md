link https://platzi.com/clases/6735-patrones-diseno-software/60235-nuestros-planes-para-aprender-patrones-de-diseno/

## Clase 02: Nuestros planes para aprender patrones de diseño

Los patrones de diseño se dividen en tres categorías principales:

1. **Patrones Creacionales**
2. **Patrones Estructurales**
3. **Patrones de Comportamiento**

## Clase 03: Ingeniería de Software

La ingeniería de software es fundamental para el diseño. Sin este concepto, no existiría un enfoque estructurado para crear software.

-   **Ingeniería**: Es el diseño, pruebas y construcción de sistemas utilizando matemáticas y ciencias.
-   **Producto**: Para nosotros, el producto es el software.

### Ingeniería de Software

La IEEE define la ingeniería de software como "la aplicación de un enfoque sistemático, disciplinado y cuantificable al diseño, desarrollo, operación y mantenimiento del software".

#### Historia

-   **Máquina Analítica**: Primeras bases de la ingeniería.
-   **1966**: Se empieza a utilizar el término "Ingeniería de Software".
-   **1968**: Conferencia en la OTAN sobre ingeniería de software.
-   **NASA**: Margaret Heafield H. desarrolló el software del programa Apolo.

## Clase 04: Ciclo de Vida del Desarrollo de Software (SDLC)

El objetivo es producir software con las siguientes características:

-   Alta calidad
-   Bajos costos
-   Menor tiempo posible
-   Dividido en fases

### Fases del SDLC

1. **Planeación**: Idea del cliente y viabilidad del proyecto.
2. **Diseño**: Implementación de la solución, diseño de la interacción del usuario y tecnologías a usar.
3. **Implementación**: Programación según el diseño. Es la fase más larga.
4. **Pruebas**: Validación con los usuarios.
5. **Despliegue**: Lanzamiento del proyecto.
6. **Mantenimiento**: Preparación para enfrentar problemas o caídas.

### Perspectivas de implementación

-   **Waterfall**: Similar a las fases, se debe completar una antes de avanzar a la siguiente.
-   **Ágil**: El framework más utilizado.

## Clase 05: Elementos de un buen diseño de software

El diseño de software abarca distintas perspectivas:

-   **UI/UX**: Interfaz, ubicación de elementos y colores.
-   **Ingeniería**: Arquitectura, equipo de trabajo, metodología.

### Aspectos importantes

1. **Modularidad**: Pedazos de software con responsabilidades bien delimitadas.
2. **Tolerancia a fallos**: Capacidad de solucionar problemas en funcionamiento.
3. **Robustez**: Resistencia ante situaciones de estrés.
4. **Seguridad**: Políticas de seguridad, credenciales y accesos.
5. **Usabilidad**: ¿Cumple su labor la interfaz?
6. **Reusabilidad**: Reutilización y crecimiento del software.
7. **Extensibilidad**: Capacidad de integrar cambios sin modificar lo existente.

## Clase 06: Reusabilidad

Ventajas:

-   Reducción de costos y tiempo.
-   Recursos destinados a otros temas.
-   Eliminación de duplicación mediante DRY (Don't Repeat Yourself).

### Niveles de reusabilidad

1. **N1**: Clases y funciones (ingredientes).
2. **N2**: Patrones de diseño (recetas).
3. **N3**: Frameworks (comida congelada).

## Clase 07: Extensibilidad

Capacidad de agregar cosas nuevas sin modificar lo existente.

-   **Retos**:
    -   Uso de interfaces como contrato: Reglas que las clases deben seguir.

## Clase 08: Soluciones a problemas a través de patrones

Nos enfocamos en:

-   Reusabilidad
-   Extensibilidad
-   Sencillez

### Proceso para resolver problemas

1. Planteamiento del problema
2. Implementación intuitiva
3. Nuevos requerimientos
4. Planear para reutilizar y extender
5. Repetir

## Clase 09: Historia de los patrones

-   **1977**: Libro sobre lenguajes de patrones en la ciudad y naturaleza.
-   **1994**: Inspiración para crear patrones de diseño en software.

Los patrones de diseño enseñan a pensar en estrategias, modelar y expandir la mente.

-   Un patrón no es un algoritmo.
-   Un algoritmo es un conjunto de pasos ordenados.

## Clase 10: Categorías de patrones

1. **Patrones Creacionales**: Creación de objetos para mejorar flexibilidad y reutilización.

    - Builder
    - Factory Method
    - Singleton

2. **Patrones Estructurales**: Ensamblar objetos y clases en estructuras grandes manteniendo flexibilidad.

    - Adapter
    - Decorator
    - Facade
    - Proxy

3. **Patrones de Comportamiento**: Comunicación efectiva y asignación de responsabilidades.
    - Command
    - Iterator
    - Observer
    - Strategy

## Clase 11: Programación Orientada a Objetos (POO)

La POO utiliza patrones de diseño, trabajando con objetos y clases, que son abstracciones del mundo real.

### Pilares de la POO

1. **Abstracción**
2. **Polimorfismo**: Modificar comportamientos.
3. **Encapsulación**: Comportamientos únicos.
4. **Herencia**: Relación padre-hijo, hereda comportamientos.

## Clase 12: Herencia y composición

1. La subclase utiliza métodos de la superclase.
2. Los métodos públicos son la interfaz, los privados son internos.
3. Se reutiliza código para crear clases intermedias.

### Composición

Prioritaria sobre la herencia. Una clase depende de otra para ser creada, similar a una clave foránea en SQL.

## Clase 13: Relaciones entre clases

**UML (Unified Modeling Language)**: Diagrama gráfico de clases o procesos.

### Tipos de relaciones

-   **Dependencia**: Cambios en una clase afectan a otra.
-   **Asociación**: Acceso permanente de una clase a otra.
-   **Implementación**: Define el comportamiento basado en métodos.
-   **Herencia**: Similar a la implementación, pero puede extender comportamientos.
-   **Agregación**: Añade clases útiles pero no interfiere en su eliminación.
-   **Composición**: La clase mayor controla la creación y eliminación de otras.
