## APuntes de otros alumnos

https://eminent-gosling-e4a.notion.site/An-lisis-de-Datos-con-Power-BI-d046ee350d7e468dbf3ffb88abc7fb99

## Clase 01/26 : Aprende Power BI

El profesor Renzo Roca, ingeniero empresarial con una maestría en Business Intelligence, Business Analytics y Big Data, con más de siete años de experiencia en el mundo de los datos, nos da la bienvenida al
Curso de Análisis de Datos con Power BI.

¿Qué vas a aprender?
En este curso aprenderás el 360 de una solución integral de Business Intelligence con Power BI. Pasando por las fases de: ETL, modelamiento, visualizaciones y delivery de la información, todo ello con un enfoque de automatización.

En este curso aprenderemos el 360 de una solución integral de Business Intelligence con Power BI. Pasando por las fases de: ETL , modelamiento, visualizaciones e inclusive estableciendo el delivery de la información, todo ello con un enfoque de automatización.

## Clase 02/26 : Aprende Power BI

Power BI es una solución integral de Business Intelligence, que proporciona una vista detallada de los datos más críticos dentro de una organización.

### ¿Qué es Business Intelligence (BI)?

Es la habilidad de transformar los datos en información, y la información en conocimiento, para agilizar la toma de decisiones.

### Flujo de BI

- ETL (Extract - Transform - Load): se refiere a la extracción, transformación y carga de los datos. Es un proceso requerido para convertir los datos en información.
  Algunas herramientas para ETL son Power Center, Integration Services y ODI. Permiten establecer un flujo de procesos que ayuda a homologar y limpiar datos, para luego cargarlos en un data warehouse; lo que nos lleva al modelado de datos.

- Modelado: a través de relaciones y creación de métricas e indicadores se establece el modelo de datos para responder a las preguntas de negocio. Aquí tenemos herramientas como Erwin Data modeler o Powerdesigner.

- Reporting: pasamos a la visualización de datos, reportes, dashboards y storytelling. En este paso encontramos herramientas como Power BI, Tableau, MicroStrategy, etc.

### Power BI

Esta plataforma unificada y escalable para BI cuenta con esta suite de negocio.

### Suite de negocio de Power BI

- PBI Desktop: herramienta exclusiva para Windows que permite conectarse a diversas fuentes de datos y crear reportes. Es donde empieza el _flujo del proceso_ de una solución de BI con Power BI.

- PBI Service: servicio en la nube que permite establecer un ambiente colaborativo (delivery de información).

- PBI Mobile: permite visualizar e interactuar con dashboards desde dispositivos móviles.

### Componentes de Power BI:

● Power Query: para el proceso de ETL.
● Power Pivot: para el modelamiento con el fin de responder las preguntas de negocio

## Clase 03/26 : Aprende Power BI

Existen distintas arquitecturas/planes que incorporan los componentes de Power BI de distinta manera.

### Power BI Free

Como su nombre lo indica Power BI Free, es la capa gratuita de Power BI.

Incluye 1 GB de almacenamiento.
No permite la colaboración simultánea (reportes, dashboards y dataset).
Compartir reportes solo es posible en modo público. Por esto se recomienda únicamente usar el plan free para reportes o proyectos personales.

### Power BI PRO

Power BI PRO ofrece los servicios de Power BI Free, más herramientas colaborativas.

Incluye 10 GB de almacenamiento.
Se puede compartir con usuarios internos siempre que también cuenten con una licencia PRO. Por ejemplo, se necesitarían dos licencias para que un desarrollador comparta un proyecto otra persona.
Permite compartir la información de manera segura y confiable.
Cuenta con una opción de puerta de enlace (Power BI Gateway). Soporta hasta 8 recargas de aplicación al día.

### Power BI Premium

Power BI Premium ofrece los servicios de Power BI PRO con alguna mejoras.

Incluye 100 TB de almacenamiento.
Se puede compartir con usuarios internos sin que tengan Power BI Pro.
Mayor escalabilidad y rendimiento que la capacidad compartida en Power BI Service.
Cuenta con Power BI Gateway. Soporta hasta 48 recargas por día.

## Clase 04/26 : ACTUALIZACIÓN: cómo conectarte a la base de datos

En la siguiente clase aprenderás de los tipos de conexiones que existen en Power BI, siendo una de ellos las bases de datos SQL Server. Las credenciales de acceso que verás en el video de la siguiente clase han cambiado por temas de seguridad.

Sigue estas instrucciones y usa las credenciales indicadas para conectarte a la base de datos actualizada en SQL Server:

Abre Power BI Desktop en tu computadora.

En la pestaña de Inicio dirígete a Obtener datos y elige la opción SQL Server.

Ingresa los datos de Servidor y Bases de datos (opcional). ⚠️ Aunque diga opcional, agrega la base de datos.
🪪 Nuevas credenciales de acceso a base de datos

Servidor: renzoroca.database.windows.net
BD: Ciclismo_RenzoRoca
Usuario: practicas
Contraseña: ProfesorRenzoRoca2023.

Owner : https://www.flowcode.com/page/renzoroca

Selecciona la pestaña Base de datos e ingresa Nombre de usuario y constraseña.
Te aparecerá el Navegador donde podrás escoger cualquier tabla de la base de datos.
Después simplemente revisa las tablas que necesites cargar. Nota: siempre hay que conectarse a formatos tipo tabla.

## Clase 05/26 :

Power BI puede conectarse a una gran variedad de fuentes de datos, desde archivos Excel, bases de datos en SQL Server, hasta sitios en la web.

Tipos de conexión:
Importación: los datos se copian de local dentro de Power BI (el tipo más común).
Direct Query: los datos no se copian, cada interacción hace una consulta a la base de datos. Recomendable para datos que cambian con frecuencia
Live Connection o dinámica: lectura desde SSAS o desde un conjunto de datos de Power BI Service.
Modelos Compuestos: combina las tecnologías de importación y Direct Query. Permite utilizar múltiples conjuntos de datos.
Obtener datos
Abrimos Power BI Desktop, y en la pestaña de inicio nos dirigimos a “Obtener datos”. Veremos algunas fuentes comunes para obtener datos. Podemos hacer clic en “Más…” para ver todas las fuentes de datos que nos ofrece Power BI.

Para probar la conexión de tipo importación, podemos simplemente abrir cualquier archivo Excel. Para probar Direct Query, seleccionamos SQL Server en la pestaña de inicio (o al hacer clic en obtener datos). Entonces, tendremos la opción de seleccionar importación o DirectQuery. Luego, nos conectamos a la base de datos con los siguientes datos de acceso.

⚠️ ACTUALIZACIÓN: nuevos datos de acceso a base de datos

Servidor: renzoroca.database.windows.net
BD: Ciclismo_RenzoRoca
Usuario: practicas
Contraseña: ProfesorRenzoRoca2023.

Owner : https://www.flowcode.com/page/renzoroca

Después, simplemente chequeamos las tablas que queremos cargar. Nota: siempre hay que conectarse a formatos tipo tabla.

## Clase 06/26 : ¿Qué es ETL?

Muchas veces nuestros datos no están listos para ser analizados visualmente, por lo que debemos pasarlos por un proceso conocido como ETL.

ETL es un proceso intermedio entre las fuentes de datos originales de donde extraemos información, y el modelado de datos para su posterior análisis. ETL consta de tres pasos:

Paso 1: Extract
Extraer datos desde cualquier fuente, ya sea archivos planos, binarios, bases de datos o servicios cloud. Pueden ser fuentes operacionales internas (es decir, que recopilan información de transacciones en nuestra empresa), o bien fuentes externas. Esto en función de los análisis que se quieran llevar a cabo.

Paso 2: Transform
Transformar, limpiar o enriquecer la información extraída sin modificar la fuente. Es en este paso que se ajustan los datos según el modelo de datos (el cual se diseña previo a la creación del ETL).

Paso 3: Load
Cargar los datos ya transformados al modelo de datos

## Clase 07/26 : Transformar datos con Power Query

Power Query es una tecnología de conexión de datos que permite detectar, conectar, combinar y refinar distintos orígenes de datos para satisfacer las necesidades de análisis.

¿Qué hace Power Query?
En escencia, hace un proceso de ETL. Extrae, transforma y carga en Power BI los datos para su posterior análisis. Ojo, el objetivo de Power Query no es analizar los datos.

En Power Query se habla de “Magia”, que es una colección de pasos para llegar a un resultado, que permite retroceder o avanzar sin modificar el origen de datos. Es similar a los macros de Excel.

Usar Power Query
Para entrar en Power Query, simplemente seleccionamos la tabla que queremos procesar y hacemos clic en “Transformar datos”.

Una vez en Power Query, podemos observar el tipo de dato de cada columna:

Power Query maneja distintos tipos de datos que Excel. Al conectarse a una fuente de datos, crea diversos pasos aplicados (Applied Steps):

Uno de estos pasos aplicados es Tipo Cambiado/Changed Type, que asigna un tipo de dato a cada columna:

---

++Power Query++ Es una tecnología de conexión de datos que permite detectar, conectar, combinar y refinar distintos orígenes de datos para satisfacer las necesidades de análisis.

¡Qué hace Power Query? ● Extrae: Desde prácticamente cualquier fuente de datos. ● Transforma: Desde fusionar, combinar, limpiar o enriquecer la data. ● Carga: Los datos para su posterior análisis en Power BI.

Puntos a considerar: ● El objetivo del Power Query ++es obtener datos de una variedad de fuentes, y prepararlos para su posterior análisis.++ ● El objetivo de esta herramienta ++no es analizar los datos.++ ● Magia: Colección de pasos que se realiza para llegar a un resultado, además permite retroceder o avanzar sin modificar el origen de datos. Similar al proceso que realiza un macro en Excel.

## Clase 08/26 : Aprende Power BI

## Clase 09/26 : Combinaciones

## Clase 010/26 : MODELADO DE DATOS

## Clase 011/26 : Relaciones y filtros

## Clase 012/26 : Corrigiendo problemas de modelado

## Clase 013/26 : Lenguaje DAX

## Clase 014/26 : Usar CALCULATE

## Clase 015/26 : Inteligencia de tiempo

## Clase 016/26 : Iteradores X

## Clase 017/26 : Data Storytelling

## Clase 018/26 : Crear Visualizaciones

## Clase 019/26 : Crear un informe con Power BI

## Clase 20/26 : Analítica de datos con Power BI

## Clase 21/26 : Analítica de datos con Python / R

## Clase 22/26 : ¿Qué es Power BI Service?

## Clase 23/26 : Compartir nuestros informes

## Clase 24/26 : Crear un dashboard en Power Bi

## Clase 25/26 : Implementar una puerta de enlace con Power BI Service

## Clase 26/26 : Conclusiones del curso

¡Felicidades! Ahora sabes utilizar Power BI para establecer el 360 de un proyecto de Business Intelligence. Power BI se compone de distintos componentes para todas las etapas del proceso de BI. Deja en los comentarios en qué orden te gustaría ver los siguientes (futuros) cursos.

DAX
Business Analytics con Power BI
Power Query y Lenguaje M
Power BI Services
