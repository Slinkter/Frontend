# Trabajando con imágenes

Una imagen de Docker es una plantilla de solo lectura que define al contenedor. La imagen contiene el código que se ejecutará, incluida cualquier definición para cualquier biblioteca o dependencia que el código necesite.

## 1 Principales comandos

Para poder trabajar con las imágenes utilizaremos el comando docker de la siguiente forma "docker image [comando]"

#### docker image pull

Permite descargar una imagen de un registro

```sh
$ docker image pull NAME[:TAG]
```

El siguiente comando es equivalente

```sh
$ docker pull NAME[:TAG|@DIGEST]
```

Ejemplo de uso:

Deseamos descargar la imagen oficial de python, para ello nos dirigimos a docker hub en la siguiente url https://hub.docker.com/_/python

Si deseamos descargar la imagen de python con la etiqueta 3.12.1 lanzamos el siguiente comando:

```sh
$ docker pull python:3.12.1
```

También podemos hacerlo mediante el digesto

```sh
 $ docker pull python@sha256:a3d69b8412f7068fd060ccc7e175825713d5a767e1e14753e75bce6f746c8a7e
```

#### docker image push

Este comando permite subir las imágenes en el registro de Docker Hub o AWS ECR.

```sh
$ docker image push [OPTIONS] NAME[:TAG]
```

En secciones posteriores de este curso cubriremos con mas detalle este comando

#### docker image inspect

Muestra información detallada sobre una o más imágenes.

```sh
$ docker image inspect [IMAGE...]
```

#### docker image ls

Este comando mostrará todas las imágenes de nivel superior, su repositorio, etiquetas y su tamaño.

```sh
$ docker image ls
```

Para ver los digestos lanzaremos el siguiente comando

```sh
$ docker image ls --digests
```

Para ver todas las imágenes incluyendo las capas intermedias usaremos

```sh
$ docker image ls --all
```

#### docker rm

Para eliminar una o mas imágenes corremos el comando

```sh
$ docker image rm [IMAGE...]
```

### ¿Qué son las Imágenes de Docker?

Las imágenes de Docker son plantillas inmutables que contienen todo lo necesario para ejecutar una aplicación: código, bibliotecas, dependencias, herramientas y configuraciones. Piensa en ellas como una instantánea del entorno de tu aplicación en un momento específico.¿Cómo

### Funcionan las Imágenes de Docker?

Creación:
Las imágenes se crean a partir de un archivo llamado Dockerfile, que contiene una serie de instrucciones para construir la imagen.

Ejemplo de Dockerfile:

```sh
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run build
EXPOSE 3000
CMD [ "npx", "serve", "-s", "build" ]

```

### Almacenamiento:

Las imágenes se almacenan en un registro de imágenes, como Docker Hub, donde pueden ser descargadas y utilizadas por otros usuarios.

Puedes listar las imágenes almacenadas localmente con el comando docker image ls.

### Ejecución:

Cuando ejecutas una imagen, Docker crea un contenedor a partir de esa imagen. El contenedor es una instancia en ejecución de la imagen.

Comando para ejecutar una imagen:

```sh
docker run -it python:3.12.1
```

### ¿Están Instaladas o Solo Descargadas?

**Descargadas**: Cuando haces docker pull, la imagen se descarga y se almacena localmente en tu máquina.

**Instaladas**: Las imágenes no se "instalan" en el sentido tradicional. En lugar de eso, se utilizan para crear contenedores que ejecutan la aplicación.

## Tabla de Comparación: Imágenes vs Contenedores

| Característica     | Imágenes                                                                           | Contenedores                                      |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Definición**     | Plantillas inmutables que contienen todo lo necesario para ejecutar una aplicación | Instancias en ejecución de una imagen             |
| **Estado**         | Estáticas (no cambian una vez creadas)                                             | Dinámicos (pueden cambiar durante la ejecución)   |
| **Almacenamiento** | Almacenadas en registros de imágenes (Docker Hub, etc.)                            | Almacenados en el sistema de archivos del host    |
| **Uso**            | Utilizadas para crear contenedores                                                 | Ejecutan la aplicación en un entorno aislado      |
| **Comando**        | `docker image ls` para listar imágenes                                             | `docker ps` para listar contenedores en ejecución |

## Eliminar y Limpiar

### Eliminar Contenedores

-   Eliminar un Contenedor Específico:

```sh
docker rm 5e261a6ebe21
```

-   Eliminar Todos los Contenedores Parados:

```sh
docker container prune
```

### Eliminar Imágenes

Eliminar una Imagen Específica:

```sh
docker rmi 86ac1e3337a9
```

Eliminar Todas las Imágenes:

```sh
docker rmi $(docker images -q)
```

## Eliminar Volúmenes

### Eliminar un Volumen Específico:

```sh
docker volume rm my_volume
```

### Eliminar Todos los Volúmenes:

```sh
docker volume prune
```

## Eliminar Redes

### Eliminar una Red Específica:

```sh
docker network rm my_network
```

### Eliminar Todas las Redes No Utilizadas:

```sh
docker network prune
```

### **Comandos Combinados**

```sh
# Eliminar todos los contenedores parados
docker container prune -f

# Eliminar todas las imágenes
docker rmi $(docker images -q)

# Eliminar todos los volúmenes no utilizados
docker volume prune -f

# Eliminar todas las redes no utilizadas
docker network prune -f



```
