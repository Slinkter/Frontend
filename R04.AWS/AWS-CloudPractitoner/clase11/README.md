clase 11

# Tools for DevOps

### AWS CodeCommit

-   servicio control almace host privado de git
-   github de AWS
-   controlador de versiones en AWS
-   ventaja de suar codecommit :
    -   desplegar jalar el codigo dentro de AWS (seguro)
-   Github , el codigo se tiene conectar a la infraestructura AWS para usar los servicios de AWS .
-

### AWS CodeBuild

-   jenkis , herramienta de intreacion continua
-   para DevOps
-   crear un ambiente para pruebas unitarias
-   corre pruebas unitarias
-   validad el codigo y llevar a produciosn
-   select Provider : Usa CodeCommit (Github, S3 , Bitcket)
-   select repositorio (actualizado)
-   select branch
-   create codebuild -->start build
-

### AWS CodeDeplot

-   automatizar el despligue de los artefacto de software
-   a servicios de AWS (EC2, lambda , etc)
-

### AWS CodePipeline

-   entrega continua
-   automatizar de los pipeline
-   para actualiza las aplicaciones

#### explicacion de devops

##### Flujo (AWS Codepipeline)

-   source (codecommit)
-   Build (codebuild(docker))
-   Test (codebuild+toots)
-   Production (codeDeploy)

### WorkShop

###  AWS Code start

-   plantillas
-   ya no esta disponible

### AWS CodeArtifact

-   Manejador de paquetes (como npm)
-

### AWS x-ray

-   es para monitorear arquitecuta de micro-servicios(varios componentes , varios lenguaje de programacion )
-   no se usa en arquitecturas monolito-servicio (un solo proyecto , un solo lenguaje de programacion )
-   los servicios se comunica http para comunicarse en microservicios
-
