# Contruyendo el Dockerfile

Un Dockerfile es un archivo o documento de texto simple que incluye una serie de instrucciones que se necesitan ejecutar de manera consecutiva para cumplir con los procesos necesarios para la creación de una nueva imagen.

## 1 Estructura

El dockerfile puede contener los siguinetes elementos:

FROM: Permite especificar la imagen base.

MAINTAINER: Especifique el autor de una imagen.

RUN: Ejecute comandos de compilación

WORKDIR: Cambiar directorio de trabajo.

COPY: Copiar archivos y directorios.

ADD: Agregue archivos y directorios locales o remotos.

EXPOSE: Describe en qué puertos escucha tu aplicación.

VOLUME: Crea un volumen para montar.

ENV: Establece variables de entorno.

ARG: Utilice variables de tiempo de construcción.

ENTRYPOINT: Especifica el ejecutable predeterminado.

CMD: Especifique comandos predeterminados.

## 2 Ejemplo

Vamos a posicionarnos en la carpeta flaskapp dentro de este repositorio. Luego vamos a lanzar el siguiente comando para empezar la construccion del contenedor

```sh
$ docker build -t myapp .
```

Una vez que el build fue exitoso, vamos a lanzar el contenedor

# Comando `docker build -t myapp .`

El comando `docker build -t myapp .` se utiliza para construir una imagen de Docker a partir de un Dockerfile en el directorio actual. Aquí te explico cada parte del comando:

-   **`docker build`**: Este es el comando principal para construir una imagen de Docker.
-   **`-t myapp`**: La opción `-t` se usa para etiquetar la imagen que se va a crear. En este caso, la imagen se etiquetará como `myapp`. Puedes pensar en esto como darle un nombre a la imagen.
-   **`.`**: El punto (`.`) indica el contexto de construcción, que en este caso es el directorio actual. Docker buscará un archivo llamado `Dockerfile` en este directorio para saber cómo construir la imagen.

Cuando ejecutas este comando, Docker sigue estos pasos:

1. **Lee el Dockerfile**: Docker busca un archivo llamado `Dockerfile` en el directorio especificado (en este caso, el directorio actual).
2. **Ejecuta las instrucciones**: Docker ejecuta cada instrucción en el Dockerfile en orden. Cada instrucción crea una nueva capa en la imagen.
3. **Etiqueta la imagen**: Una vez que todas las instrucciones se han ejecutado, Docker etiqueta la imagen resultante con el nombre especificado (`myapp`).

```sh
FROM python:3.10.13
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV SERVER_ENV=development
EXPOSE 8000
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["python3", "main.py"]
```

```sh
$ docker run -p 8000:8000 myapp
```
