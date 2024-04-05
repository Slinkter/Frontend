link https://platzi.com/clases/6735-patrones-diseno-software/60235-nuestros-planes-para-aprender-patrones-de-diseno/

## Clase 02 : Nuestros planes para aprender patrones de diseño

los patrones de diseño tiene

    * 1. Patrones Creacionales
    * 2. Patrones Estructurales
    * 3. Patrones de Comportamiento

## Clase 03 :Ingeniería de Software

sin este concepto no habria diseño ,

- Ingenieria es diseño las pruebas la construcion de maquina utilizando matemticas y ciencias .

el producto es software para nosotros

- I.de Software : IEEE define como es la aplicación de un enfoque sistemático, disciplinado y cuantificable al diseño, desarrollo, operación y mantenimiento de software.

- Historia
  - la Maquina Analitica
  - 1966 : se utiliza la palabra ing. de software
  - 1968 : conferencia en la OTAN
  - NASA : Margaret Heafield H. desarrolló el Software del programa Apolo.

## Clase 04 :Ciclo de Vida del Desarrollo de Software (SDLC)

- La produccion de un software con las siguiente caracteristicas

  - Alta calidad
  - Costos bajos
  - Menor tiempo posible
  - Todo el proceso tiene Fases

  ### Fase 1 : Planeación :

  - Ideal del cliente
  - Se da una forma para que se viable

  ### Fase 2 : Diseño

  - Implementacion de la solucion
  - Diseño de interacion del usuario
  - Tipos de tecnologia a usar

  ### Fase 3 : Implementacion

  - la fase mas larga
  - programacion segun diseño

  ### Fase 4 : Pruebas.

  - validar con los usuarios (equipo de diseño se encargar).

  ### Fase 5 : Despliegue

  - Deploy del proyecto (lanzar la aplicacion)

  ### Fase 6 : Mantenimiento

  - Estar preparado por cualquier situacion si se cae la aplicacion

- Implementacion del ciclo de vida (2 perspectiva)

  ### WaterFall

        * Se parece a las fases, es obligatoria terminar

  ### Agil

        * El framework mas usado

## Clase 05 :Elementos de un buen diseño de software

- Fase de diseño de software

- existe muchos tipos de diseños

- para construir aplicacion existe 2 perpectiva .

  - UI/UX : interfaz, donde colocar cierto elementos y colores
  - Ingenieira :arq. , staff del equipo , metodologia.

### Ingenieria :

    - La modularidad (Pedazos de software que funcionan como código cuyas responsabilidades están bien delimitadas).

    - Tolerancia a fallo (Capacidades para solucionar problemas que se puedan presentar en el funcionamiento de la aplicación).

    - Robustez (Funcionamiento de la aplicación ante situaciones de estrés como memoria insuficiente, bases de datos llenas, peticiones altas, etc.)

    - Seguridad (Políticas de seguridad, credenciales, accesos, etc.)

    - Usabilidad(La interfaz cumple su labor? Abarca todos los casos de Uso?)

    - Reusabilidad (Reusar piezas de software y crecimiento del mismo)

    - Extensibilidad (Capacidad de integrar nuevos cambios sin tener que modificar lo ya existente)

## Clase 06 : Reusabilidad

- reducion de costo y tiempo
- los recursos se destina para otros temas
- eliminar la duplicacion y crear la abstraccion (DRY,dont repetir yourseft)
-

### Nivel de reusabilidad

    -N1 : Clases y funciones (ingredientes)
    -N2 : Patrones de diseño (receta de cocina)
    -N3 : Frameworks (cogelado comida)

## Clase 07 : Extensibilidad

- la capacidad de agregar/integrar nuevas coasas sin la necesidad de cambiar lo existente.
- Modificar lo menos posible
- retos :
  - uso de interfaz-contrato :
    - Estipula las reglas que, las clases que lo implementen, tienen que seguir.
    - En este sentido, una interfaz puede entenderse como un contrato abstracto que establece el comportamiento esperado del componente que la implementa, así como las restricciones, requisitos y formatos de entrada y salida que deben cumplirse

## Clase 08 : Soluciones a problemas a través de patrones

nos enfocamos en la Reusabilidad , Extensibilidad y Sencillez

proceso para llegar a resolver un problemas :

    1.Planteamiento del problema
    2.Implementación intuitiva
    3.Nuevos requerimientos
    4.Planear reutilizar y extender
    5.Repetir

## Clase 09 :

1977 - Libro : lenguaje de patrones ciudad y naturales
1994 - Libro inspirado para crear patrones de diseño

los diseños de de patrones te enseña a pensar estrategias , modelar , expandir tu mente .

los patrones de diseño son aplicado segun el contexto de problemas , los elementos identificados para crear la solucion.

un patron no es un algoritmo
un patron es resultado y funciones. no existe pasos a seguir. son consideraciones , clases .nos toca detectar las consideracion para implementar el patron de la mejor forma posible (crear un plan)
un algorito es conjunto de pasos ordenados.

## Clase 10 : Categorias

Patrones Creaciones : proporcionan mecanismos de creación de objetos que incrementan la flexibilidad y la reutilización de código existente.

- Builder
- Factory Method
- Singleton

Patrones Estructurales : explican cómo ensamblar objetos y clases en estructuras más grandes a la vez que se mantiene la flexibilidad y eficiencia de la estructura.

- Adapter
- Decorator
- Facade
- Proxy

Patrones de Comportamiento :se encargan de una comunicación efectiva y la asignación de responsabilidades entre objetos.

- Command
- Iterator
- Observer
- Strategy

## Clase 11 :

la POO usa muchos de patrones de diseño

POO : Objectos y clases

los objectos son abstraciones del mundo real , tangibles y no tangible
pero tiene comportamiento y caracteristica.

Pilares de la Poo :

- Abstraccion :
- Polimorfismo : puede modificar los comportamientos . (corre de naruto)
- Encapsulacion : comportamiento unicas
- Herencia : padre-hijo , hereda comportamientos

## Clase 12 : Herencia y composicion

1 : la subclase utiliza metodos de la superclase(estan unidades)
2 : los metodos publico de la superclases son intefaz y los metodos privados solo funciona internamente y no esta espuestos a la subclase. la subclase puede extender el comportamiento de la superClase ,
3 : Arbol de clases , se reutiliza codigo para crear clases intermedias .

la Composicion : sobre herencia , se prioriza

una clase depende de otra clase para ser creada . es como una llave foreana
sql .

La agregacion es muy similar a la composicion

## Clase 13 : Relaciones entre Clase

UML : Unified Model Languaje.

- Escribir de manera grafica diagrama de clase o proceso

### Relaciones

- dependencia: Se da cuándo al realizar cambios en una clase se modifica otra

- asociación: Se da cuándo una clase tiene acceso permanente a otra clase

- implementación: Se da cuándo una clase define su comportamiento basado en cierto método

- herencia: Similar a la anterior, pero puede extender su comportamiento

- agregación: Se da cuándo una clase necesita de otras clases, pero no interfiere en su creación o eliminación. Simplemente las añade mientras sean útiles

- composición: Se da cuándo una clase necesita de otras clases, pero interfiere en su creación y eliminación. Así mismo si el elemento mayor desaparece, las demás clases dejan de ser útiles
