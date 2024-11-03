## Evento

-   un accion que se realiza en la AppWeb por un usuario
-   agregar info por formularios hacia
-   Node esta basado en eventos asicronos
-

## Evento sincrono

-   bloquea el proceso hasta que termine

### Evento asicrono

-   se ejecuta en paralelo sin bloquear el proceso principal
-   node esta basado en eventos asicronos .
-   modelo cliente(envia eventos)-servidor(escucha eventos)
-   Emitters : emisores que es un objecto que emite eventos.
-   EventEmmiter : Objecto Clase (plano)
    -   Evento **.on** :
-   EventHandler: es un lisener maneja el evento (POO)
-   Modulo events : definir emitir escuchar
    -   Definir- Emitir-Escuchar eventos
-   Ejercio

## Promesa

-   se usa cuando un usuario interaua con un servidor
-   no sabes cuanto tiempo va a tomar realizar el evento
-   el servidor usa promesas.
-   no sabes el resultado que va a ocurre
-   tiene que acabar para saber el resultado
-   no sabes cuanto tiempo va a demorar en response el servidor
-   factores : velocidad de internet , disponibilidad del servidor
-   tiene 3 estados :
    -   Pending
    -   Fulfilled
    -   Rejected
-   Promesa : **objecto de javascript**
-   cuando se termina Promesa o el proceso asicronica : funcion callback = funcion de respuesta , funcion que ingresa como argumento en una funcion.
-   metodo .then() : decidir que hacer con el codigo respuesta

-   practica ejercicio
