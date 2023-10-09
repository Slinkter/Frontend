resumen

https://luis-ariza.notion.site/NPM-Gesti-n-de-Dependencias-y-Paquetes-en-JavaScript-8d621bda1a3743f6a45f068dcdc2deb3

## Clase 02 :Gestión de dependencias

Js nace en 1995
Node y npm nace en 2009
npm es el gestor de paquetes, ayuda crear herramientas estandar para ser compartidas y usadas por otros .
CLI: donde van los comandos

## Clase 03 :MACos

instalacion de node LTS y npm ... en terminal :
node -v
npm -v

## Clase 04 : Windwows

## clase 05 : Primeros pasos en NPM

Comando para inicializar npm :

    - npm i -y

## clase 06 :Instalación de dependencias

    - npm i moment

Paquete usado para validar el codigo en desarrollo y no se usa en produccion.

- npm i eslint --save-dev
- npm i eslint -D

Paquete para usar en produccion

- npm i react --save

Paquetes globales , no esta ligado al proyecto/carpeta sino al sistema operativo,
no se agrega ni modifica al packeage.json

- npm i -g cowsay

Ver la lista de paquetes instalados en el proyecto

- npm list

Ver la lista de paquetes instalados global

- npm list -g

Instalar opcional un paquete (puede actualizar el paquete)

- npm eslint -o

Comflicto entre diferentes versiones de un paquete, para esto simula la instalacion

- npm install react-dom --dry-run

Instalar un paquete con la version especifico

- npm install json-server@0.15.0

## Clase 08 : Comandos en NPM (Scripts)

El apartado de "scripts" en el package.json es el que indica los comandos a ejecutar del proyecto. Esta sección es la que utilizarás para crear comandos que optimicen el desarrollo de tu aplicación.

Cómo crear un comando en tu proyecto
Para crear un comando en tu proyecto, utiliza la siguiente estructura, donde es el nombre del comando que debería ser muy descriptivo y es el comando que utilizarías en la terminal.

json {
"scripts": { "<nombre>": "<comando>" }
}

Una vez hayas escrito el comando en el archivo package.json, la manera de ejecutarlo en la terminal será con el comando
npm run <nombre>.

Creemos algunos comandos comunes
Creemos tres comandos comunes:

- para iniciar el proyecto (start),
- crear un archivo para producción (build)
- y combinarlos (deploy).

Que no te preocupe si no entiendes cada comando, solo entiende cómo ejecuta NPM el script.

'''

json {
"scripts": {
"start": "webpack-dev-server --open --mode development",
"build": "webpack --mode production",
"deploy": "npm run format && npm run build"
}
}
'''

Y para ejecutarlos, es necesario utilizar el comando respectivo en la terminal:

bash $ npm run start $ npm run build $ npm run deploy

NPM provee algunos alias, como npm start que ejecuta lo mismo que npm run start.

Cómo ejecutar un paquete de manera directa
NPM te permite instalar paquetes en tu proyecto,
sin embargo,

NPX (Node Package Execute)

permite ejecutar un comando de NPM remotamente.

Ejemplos de este comportamiento son los paquetes React y Nextjs, para iniciar un proyecto en estos se puede ejecutar los siguientes comandos, donde es el nombre del proyecto:

- bash $ npx create-react-app <nombre> $ npx create-next-app <nombre>

## Clase 09/15 :Actualización de dependencias

va a descargar un proyecto antiguo de github y va a actualizar las dependencias.

para descargar los paquetes y actualizar.

- npm install
- npm list
- npm outdate // muestra los cambios de versiones

## Clase 10/15 :Seguridad y solución de problemas

La seguridad de tu proyecto puede ser vulnerada por paquetes desactualizados. Al momento de instalar tus paquetes con el comando npm install muestra una serie de advertencias (NPM WARN) de las dependencias desactualizadas.

Auditar tus dependencias
El comando npm audit muestra una descripción de las dependencias instaladas. Si se encuentran vulnerabilidades, se calculará el impacto al proyecto.

Si se requiere un informe más detallado en formato JSON (JavaScript Object Notation), utiliza el comando npm audit --json.

El comando npm audit fix proporciona una actualización de los paquetes, similar al comando npm update <paquete>. El comando npm audit fix --force proporciona una actualización de los subpaquetes de cada paquete, en todos sus niveles de profundidad.

Si el problema persiste, es necesario actualizar el paquete a su última versión.

bash $ npm install <paquete>@latest

Solución de problemas
Cuando estés desarrollando un proyecto con NPM, puede que generes errores que no permitan seguir con tu trabajo. Saber manejar los errores es fundamental para solucionarlos y seguir con tus tareas (y no entrar en pánico). Alguno de estos errores pueden ser:

Errores en la configuración del archivo package.json
Errores de dependencias en node_modules
Errores del sistema operativo
Configuración errónea de Git o GitHub
Errores de escritura (typos)
Errores que no estén ligados directamente a NPM
Error de dependencias en node_modules
Existen situaciones en las que instalas una dependencia con una versión que no corresponde a la deseada. Esto ocurre porque NPM guarda en el caché una versión previamente instalada de un paquete, esto para mejorar los tiempos de instalación.

En esta situación, puedes utilizar los siguientes comandos, el primero para borrar el caché de NPM y el segundo para verificar si están eliminados correctamente.

bash $ npm cache clean --force $ npm cache verify

- npm audit // visualizar los paquetes que hay complicto
- npm audit --json // muestra la informacion mas detallado
- npm audit fix --force // npm nos ayuda a reparar

## Clase 11/15 : Eliminación de dependencias y Package lock

- npm uninstall name-paquete
- rm -rf node_modules // para eliminar todas las dependencia del proyecto
- npm install // para volver instalar de nuevo los paquetes que estan package.json
- npm run build --dd // activa un modo para ver mas a detalle de las dependencias.
- npm ci // para visualizar paquetes despreciadas
- package-lock.json // contiene la informacion de dependencias de dependencias .

Conocer cómo eliminar dependencias, también es importante para mantener tus proyectos sin paquetes que no aporten la solución a tu problema, que ya no sean actualizados, o que exista una mejor implementación.

Cómo eliminar paquetes
Existen dos formas de eliminar paquetes:

Eliminando el paquete con el siguiente comando: bash $ npm uninstall <paquete>
Eliminarlo manualmente del archivo package.json. Al eliminar un paquete de manera manual, es necesario actualizar el directorio de node_modules.
Cómo actualizar node_modules
Actualizar el directorio node_modules sirve para limpiar las dependencias que previamente estaban en el proyecto. También cuando existe algún archivo corrupto o una mala instalación.

Por lo tanto, deberás eliminar el directorio de node_modules y después ejecutar el comando npm install para instalar correctamente los paquetes. En ciertas situaciones, también es necesario eliminar el archivo package-lock.json.

Puedes utilizar el siguiente comando de NPM para evitar escribir demasiado cada vez que lo necesites.

json // package.json { "scripts": { "phoenix": "rm -f package-lock.json && rm -rf ./node_modules && npm i --no-fund --no-audit" } }

Mostrar los pasos ejecutados por un comando de NPM
Para identificar el error que puede existir en tu proyecto, es necesario analizar cada paso que ejecuta un comando, para saber en qué punto específico ocurre el problema.

El flag --dd en un comando de NPM, te mostrará de manera detallada cada paso ejecutado. De esta manera podrás observar si existe un error para solucionarlo.

bash $ npm [comando] --dd

Otra forma, es ejecutar el comando de NPM. Si existe un error, la terminal te mostrará los diferentes errores que encontró. Al final de este resumen, existirá una ruta con los detalles del error, puedes abrir tal archivo para observar los pasos que ejecutó.

Qué es el archivo package-lock.json
El archivo package-lock.json describe todo el árbol de dependencias de cada paquete instalado.

Cuando alguien hace fork de un repositorio no tiene el directorio node_modules por el archivo .gitignore. Mediante el comando npm install, instalarán las dependencias indicadas en el package.json con la versión indicada. También, se instalarán las sub-dependencias indicadas en package-lock.json con la versión indicada.

Esto es importante para tener instaladas siempre la versión adecuada del paquete a utilizar en el proyecto.

## Clase 12/15 :Crear un paquete

publicar un paquente en www.npm.com

- Verificar nombre de paquete si esta disponible
- creacion de un repositirio en GITHUB.
- descargar el proyecto
- npm init -y // inicio de proyecto
- crear la carperta "SRC" y archivo "index.js"
- se crear la carpeta bin y contiene el archivo globa.js
- ejecuta la funcion que esta en el archivo index.js
- falta agregar al package.json

## Clase 13/15 :Publicar un paquete

- npm link // no me salio
- pwd ///Users/ljcr/Desktop/Frontend/R03.Librerias-y-dependencias/01.Basico/01.Curso-de-NPM
- npm install g /Users/ljcr/Desktop/Frontend/R03.Librerias-y-dependencias/01.Basico/01.Curso-de-NPM
- ejecutar la funcion en terminar xk ya esta instalado en node : random-str-msg
- crear y logear en la pagina npm
- npm adduser // se inicia session en terminal
- npm publish //
- en la pagina npm documentar el paquete publicado

## Clase 14/15 :Versionado de paquetes y paquetes privados

- documentar la instalacion del paquete
- npm version 1.1.0 // actualizar el paquete
- npm publish // publicar la nueva version
-
