## AWS AutoScaling

-   Escalamiento Vertical (Recursos CPU-RAM)
    -   1pc :(2 CPU , 4 GB RAM)
    -   Scaling up :(4 CPU , 8 GB RAM)
    -   Scaling Down :(1 CPU , 2 GB RAM)
-   Escalamiento horizontal (Maquina virtual )
    -   1pc :(2 CPU , 4 GB RAM)
    -   Scaling out --> 2pc :(2 CPU , 4 GB RAM)
    -   Scaling in ()
    -   Se coloca un balanceado de cargas
-   AutoScaling
    -   especificar cant de MV (1 a 4 ) para no quemar dinero
    -   Desired Capacity :
    -   Launch configuration : ya no tiene support (son como iso)
    -   Launch templates : son AMI (iso) en AWS
    -
-   AutoScaling group (AG)
    -   asegura la cantida de instancia correcta para manejar la aplicacion.
    -   funciones :
        -   help check : revisa si esta funciona un MV
        -   Si una instalacia falla , AG saca esta MV y crear una nueva MV.
        -   AG se guia del Launch template (pre-iso-plantilla)
        -   se lanza por eventos que ocurren
        -   methodos :
            -   Manual : yo modifco cuantas MV quiero
            -   Scheduled : prender por horarios varias maquinas (MV)
            -   Dynamic :
                -   basado en metricas , es el mas usado,
                -   cuando el CPU llega al 70% de uso , agregar una nueva MV o CPU,
                -   Aumenta segun metricas del MV. com reglas
                -   Politicas : Target tracking scaling - step scaling - simple scaling
            -   Predictive: revisa el historio y prender las MV segun el patron
        -

## Classis Load Balancer

-   Classic Load Balanacer (Deprecado)
-   Applcation load balancer (Capa OSI 7)
-   Network load balancer(Capa OSI 4)
-   Gateway load balancer (Seguridad)

### 1.1 Classic Load Balanacer

-   Enviar el trafico (consultas http) si una instancia (MV) enviar a otro region o zona habilitada
-   Distribuir trafico
-   Algoritmos de enrutamiento
-   diagrama CLB
-   Alta disponiblidad

### 1.2 Application load balance

-   distribuye el trafico a diferentes Targets (MV)
-   moniteroe de los recursos
-   Diagrama ALB
-   Protocolo HTML

### 1.3 Network Load balancer

-   Trabaja en la capa 4 OSI
-   Protoco TCP UDP TLS
-   Poco se enfoca
-   Es para auditoria de paquetes
-   Inspeciona el trafico

# AWS LAMBDA

-   es un servicio de computo
-   Es como un trigger que se ejecuta
-   Correr codigo sin instalaciar un servidor (no administrar el servidor)
-   Alta disponibilidad
-   Caso de uso
    -   1.1)File Processing : cuando llega un archivo grande a AWS S3, se ejecuta un funciona para comprimir o cambiar formato
    -   1.2)Stream processing: Amazon Kinesis
    -   1.3)Web Applicaions:API-Gateway ,
    -   1.4)IOT backends : procesamietno de archivos
    -   1.5)Mobile Backends:
