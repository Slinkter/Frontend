clase 7

-   Amazon s3

-   Amazon CloudFront

-   Global Accelerator

### Aamazon S3(simple storage service)

-   Almacena objectos (archivos cvs,image,video)
-   Bucketes , es un recurso
    -   se crear un bucket y alli se almace el objecto
-   los backetes son globales en todo AWS
-
<<<<<<< HEAD
-   Amazon EBS, son para procesar archivos al instante porque se eliminan
-   buscar en la web ,desactivar block y agregar bucket policy .
=======
-                                            Amazon EBS, son para procesar archivos al instante porque se eliminan
-   buscar en la web ,desactivar block y agregar bucket policy .

#### Versioning

-

#### Replication Object

backend de espejos

-   Type :
    -   1.Cross Region : un envio(camino) , no es bidirecional
    -   2. Same Region : en la misma AZ
    -   3. Two way regiob : es bidireccional
-   S3 Clases :
    -   Standard,.....
    -   diferentes precios diferente propositos
-   PRECIOS Y TIPOS

### Amazon CloudFront

-   Servicios para entrega de delivery , para entregar contenido estastico (html-css-imagen)
-   solo funciona para paginas estaticas ,
-

### AWS Global Accelerator

-   Funcionas para paginas dinamicas
-   servicio de red CDN,para mejorar la disponibiloidad , rendimiento y seguridad de la entrega de publicaciones
-   Una CDN (Content Delivery Network o Red de Entrega de Contenido) en AWS es una red de servidores distribuidos geográficamente que trabajan juntos para entregar contenido de manera rápida y eficiente a los usuarios finales. En AWS, el servicio de CDN se llama Amazon CloudFront.
-   Provee dos Ip publicas
-   se parece a una vnp de pago pero no es .
-   desde el probeedor ips salta al servicio de global accelerator (aws network)
-   Para aplicaciones que necesita acceder a servicio dentro de AWS
-   para llamadas de api , mas velocidad de respuesta
-

## AWS EFS

-   servicio de elastitc file system
-   trabaja con instancias EC2 (MV)
-   Caso de uso : Hight performace computer
    -   Intercambio de archivo entre EC2
    -   funciona como NAS
    -   no es global region , solo funciona en una AZ
>>>>>>> 15cb806b3ebdb715cedc6604d128339a3c60b155
