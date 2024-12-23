clase 9

-   Amazon EventBridge
-   Amazon SNS
-   Amazon SQS
-   Amazon SES
-   AWS iot Core , GreenGrass

### Amazon EventBridge

-   es un servicio serveless
-   utiliza para conectar eventos a aplicaciones
-   aplicaciones base en eventos
-   sistema de bajo acoplamiento (entre MV)
-
-   Arq. basado en eventos: respuesta asicronas
    -   componente A (MV)
    -   Componente B (MV)
    -   Eventos que sucede en sus entornoes y reaciona una respuesta
-   Arq. basado en microservicio : respuesta sincronas
    -   peticion http
    -   peticion htpp
-   Process:
    -   1.  Event Buses : - cuando se almacena un file en S3 , enviar notificacion por emial.
    -   2. Pipes : recive multiple recurso , filtra para encontrar un patron
-   web
-

### Amazon SNS

-   modelo push
-   Servicio que permite enviar mensaje de suscripciones a publicadores
-   punto logico de enviar mensaje
-   solo los que confirma les llegan el mensaje
-   web

### Amazon SQS

-   modelo pull
-   producer --> cola -- > consumer
-   se acumula los mensage en la cola
-   se parece a whatsapp , cuando enviar un msj cuando el otros esta offline , los mensaje se queda en cola
-   Arq. asicrona.
-

visibility timeout

-   Generador de factura ,
-

Arq . Fanout SNS + SQS

-

### Amazon SES

-   para marketing
-   envio de mensaje email
-   configuracion con dominio

### AWS iot Core

-   devices IOT
-   enviar informacion
-   lo recibe AWS IOT
-   se conecta a los servicios AWS

###
