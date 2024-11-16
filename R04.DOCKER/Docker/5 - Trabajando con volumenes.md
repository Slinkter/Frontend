# Trabajando con volúmenes

Los volúmenes son el mecanismo para conservar los datos generados y utilizados por los contenedores Docker.

## ¿Qué son los Volúmenes en Docker?

Los volúmenes en Docker son una forma de persistir datos generados y utilizados por contenedores. A diferencia del sistema de archivos del contenedor, los volúmenes existen independientemente del ciclo de vida del contenedor, lo que significa que los datos almacenados en un volumen no se pierden cuando el contenedor se detiene o se elimina.

## ¿Cómo se Crean los Volúmenes?

Los volúmenes se pueden crear por separado usando el comando `docker volume create` o automáticamente cuando se ejecuta un contenedor con la opción `-v` o `--mount`.

## Tamaño de los Volúmenes

El tamaño de un volumen no está predefinido. Crece dinámicamente según la cantidad de datos que se almacenen en él. El tamaño está limitado por el espacio disponible en el sistema de archivos del host.

## ¿Qué Almacenan los Volúmenes?

Los volúmenes pueden almacenar cualquier tipo de datos que necesites persistir, como bases de datos, archivos de configuración, datos de aplicaciones, etc.

## Conexión de Volúmenes a Contenedores

Un volumen puede ser montado en múltiples contenedores simultáneamente. Esto permite que varios contenedores compartan y accedan a los mismos datos.

## Casos de Uso para Volúmenes

-   **Persistencia de Datos**: Mantener datos que deben sobrevivir a la eliminación de contenedores.
-   **Compartir Datos entre Contenedores**: Permitir que varios contenedores accedan a los mismos datos.
-   **Backup y Restauración**: Facilitar la copia de seguridad y restauración de datos.
-   **Desarrollo y Pruebas**: Compartir datos entre el entorno de desarrollo y los contenedores de prueba.

## Comandos mas importantes

#### docker volume create

Crea un nuevo volumen en el que los contenedores pueden consumir y almacenar datos. Si no se especifica un nombre, Docker genera un nombre aleatorio.

```sh
$ docker volume create [VOLUME]
```

#### docker volume ls

Lista los volúmenes

```sh
$ docker volume ls
```

#### docker volume rm

Elimina uno o mas volúmenes

```sh
$ docker volume rm [VOLUME...]
```

#### docker volume inspect

Devuelve información sobre un volumen.

```sh
$ docker volume inspect
```

## Montando volumenes en contenedores

#### Montamos un volumen en el contenedor

Podemos montar un volumen mientras arrancamos un containers, si el volumen no se creo previamente este se crea, el formato usado sera "-v VOLUME_NAME:CONTAINER_PATH"

```sh
docker run -v demo_volume:/app -p 8081:80 -d nginx
```

Podemos montar el mismo volumen en varios contenedores al mismo tiempo

El comando `docker run -v demo_volume:/app -p 8081:80 -d nginx` se utiliza para ejecutar un contenedor de Docker con la imagen de Nginx, montar un volumen, mapear los puertos del contenedor a los puertos del host y ejecutarlo en segundo plano. Aquí tienes una explicación detallada:

### Desglose del Comando

-   **`docker run`**: Este comando se utiliza para crear y ejecutar un nuevo contenedor a partir de una imagen de Docker.

-   **`-v demo_volume:/app`**: Esta opción monta el volumen llamado `demo_volume` en el directorio `/app` dentro del contenedor. Esto permite que los datos en `demo_volume` sean accesibles desde `/app` en el contenedor.

-   **`-p 8081:80`**: Esta opción mapea el puerto 80 del contenedor al puerto 8081 del host. Esto significa que cualquier solicitud que llegue al puerto 8081 de tu máquina será redirigida al puerto 80 del contenedor.

-   **`-d`**: Esta opción ejecuta el contenedor en segundo plano (detached mode). Esto permite que el contenedor se ejecute sin bloquear la terminal.

-   **`nginx`**: Esta es la imagen de Docker que se utilizará para crear el contenedor. En este caso, se está utilizando la imagen oficial de Nginx, que es un servidor web.

#### Montamos con una carpeta del host en el contenedor

También podemos montar un volumen del contenedor y enlazarlo con una carpeta en el host, el formato usado sera "-v HOST_PATH:CONTAINER_PATH"

```sh
docker run -v /home/slinkter/folder:/app -p 8080:80 -d nginx
```

#### Desglose del Comando

-   **docker run**: Este comando se utiliza para crear y ejecutar un nuevo contenedor a partir de una imagen de Docker.

-   **-v /home/ec2-user/environment/max:/app**: Esta opción monta el directorio `/home/ec2-user/environment/max` del host en el directorio `/app` dentro del contenedor. Esto permite que los datos en el directorio del host sean accesibles desde el directorio `/app` en el contenedor.

-   **-p 8080:80**: Esta opción mapea el puerto 80 del contenedor al puerto 8080 del host. Esto significa que cualquier solicitud que llegue al puerto 8080 de tu máquina será redirigida al puerto 80 del contenedor.

-   **-d**: Esta opción ejecuta el contenedor en segundo plano (detached mode). Esto permite que el contenedor se ejecute sin bloquear la terminal.

-   **nginx**: Esta es la imagen de Docker que se utilizará para crear el contenedor. En este caso, se está utilizando la imagen oficial de Nginx, que es un servidor web.

## Eliminando todos los recursos creados

Si deseas eliminar rapidamente todos los recursos creados (containers, networks, images), utilizaras el siguiente comando

```sh
docker system prune -a
```

Si tambien quieres eliminar los volumenes, debes lanzar el siguiente comando

```sh
docker system prune -a --volumes
```
