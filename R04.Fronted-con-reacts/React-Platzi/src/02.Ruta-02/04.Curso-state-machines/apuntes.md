¿Qué son las máquinas de estado en React.js?
Ideas/conceptos claves

# Maquina de estados

Es un modelo computacional que tiene una serie de estados que cambian entre sí

Apuntes
Siempre que tenemos una entrada tendremos una misma salida

## ¿Cuándo usarlas?

Una máquina de estados es ideal implementarla cuando solo se tiene un estado a la vez
Podemos aplicar este modelo para todos esos flujos que sean complicados y tengan una serie de pasos
Una de las ventajas es que si queremos cambiar el orden en una serie de pasos, se puede realizar de manera sencilla

    Ejemplo :
        - Semaforo
        - Maquina de producto consumo

## Concepto base

Un diagrama de estados es una representacion de una maquina de estados para ser visto de manera visual (estado y transicion que estan conectados el flujo)

Estados : son snaptshop del proceso actual de la maquina de estado

1)Tipo de estado:

    - Inicial : es cuando el estado es inactivo ,aqui arrancha la maquina de estado , solo puede existir un estado inicial.
    - Finales : muestra error o muetra datos , donde la condicion cumple o termina el flujo.

2)Eventos y Transiciones : son las maneras que nos movemos entre estados

    -Transicion : pueder ser el Failure o Sucess , es mover de una estado a otro.
    -Evento :es la accion que ejecutar el movimiento.

## que es Xstate?

es una libreria e interpreta que travaja con maquina de estados y diagramas de estados para react vue svelte .

se puede visualizar en una pagina una maquina de estado de un proyecto

# Bosquejo de nueva maquina de estado 4/15

uso de la herramienta y instalacion de dependencia

     npm install xstate@latest --save
     npm install xstate @xstate/react
