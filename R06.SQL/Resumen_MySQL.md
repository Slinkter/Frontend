# Resumen Detallado de Apuntes MySQL

mysql
cont se na : 372421luis

## Módulo 01: Reading (Lectura de Datos)

Este módulo se enfoca en las diversas formas de consultar y filtrar datos de una base de datos MySQL.

-   **00_comments.sql**: Explica cómo usar comentarios de una línea (`--`) y de múltiples líneas (`/* ... */`) en SQL para documentar el código.
-   **01_select.sql**: Muestra cómo seleccionar todos los datos (`SELECT *`) o columnas específicas (`SELECT column1, column2`) de una tabla. Es la base de cualquier consulta de lectura.
-   **02_distinct.sql**: Demuestra el uso de `DISTINCT` para obtener valores únicos en una o varias columnas, eliminando duplicados en los resultados.
-   **03_where.sql**: Explica cómo filtrar registros usando la cláusula `WHERE` con condiciones de igualdad, permitiendo seleccionar solo los datos que cumplen ciertos criterios.
-   **04_order_by.sql**: Muestra cómo ordenar los resultados de una consulta en orden ascendente (`ASC`) o descendente (`DESC`) usando `ORDER BY` por una o varias columnas.
-   **05_like.sql**: Detalla el uso del operador `LIKE` para buscar patrones de texto en una columna, utilizando comodines (`%` para cualquier secuencia de caracteres, `_` para un solo carácter).
-   **06_and_or_not.sql**: Explica cómo combinar múltiples condiciones de filtrado con los operadores lógicos `AND` (todas las condiciones deben ser verdaderas), `OR` (al menos una condición debe ser verdadera) y `NOT` (niega una condición).
-   **07_limit.sql**: Muestra cómo limitar el número de registros devueltos por una consulta usando `LIMIT`, útil para paginación o para obtener un subconjunto de datos.
-   **08_null.sql**: Explica cómo trabajar con valores `NULL` (ausencia de datos) usando `IS NULL` y `IS NOT NULL` para filtrar. También introduce `IFNULL` para reemplazar valores nulos con un valor predeterminado.
-   **09_min_max.sql**: Demuestra el uso de las funciones agregadas `MIN()` y `MAX()` para encontrar el valor mínimo y máximo de una columna numérica o alfabética.
-   **10_count.sql**: Explica cómo usar la función agregada `COUNT()` para contar el número de filas que cumplen una condición o el número de valores no nulos en una columna.
-   **11_sum.sql**: Muestra cómo usar la función agregada `SUM()` para calcular la suma total de los valores en una columna numérica.
-   **12_avg.sql**: Demuestra el uso de la función agregada `AVG()` para calcular el promedio de los valores en una columna numérica.
-   **13_in.sql**: Explica cómo usar el operador `IN` para especificar múltiples valores posibles en una cláusula `WHERE`, simplificando las condiciones `OR`.
-   **14_between.sql**: Muestra cómo usar el operador `BETWEEN` para seleccionar valores dentro de un rango específico (inclusive) para columnas numéricas, de fecha o de texto.
-   **15_alias.sql**: Detalla el uso de `AS` para asignar alias temporales a columnas o tablas, mejorando la legibilidad de los resultados de la consulta.
-   **16_concat.sql**: Explica cómo usar la función `CONCAT()` para unir dos o más cadenas de texto (columnas o literales) en una sola columna de resultado.
-   **17_group_by.sql**: Demuestra el uso de `GROUP BY` para agrupar filas que tienen los mismos valores en columnas especificadas, a menudo usado en conjunto con funciones agregadas para realizar cálculos por grupo.
-   **18_having.sql**: Explica cómo filtrar grupos de resultados usando la cláusula `HAVING`, que es similar a `WHERE` pero se aplica a los resultados de `GROUP BY` después de que se han realizado las agregaciones.
-   **19_case.sql**: Muestra cómo usar la expresión `CASE` para implementar lógica condicional en las consultas SQL, permitiendo devolver diferentes valores según una serie de condiciones.

## Módulo 02: Writing (Escritura de Datos)

Este módulo cubre las operaciones fundamentales para modificar datos en una base de datos.

-   **01_insert.sql**: Explica cómo insertar nuevos registros (filas) en una tabla, especificando las columnas y los valores correspondientes.
-   **02_update.sql**: Muestra cómo modificar registros existentes en una tabla, utilizando la cláusula `SET` para especificar los nuevos valores y `WHERE` para seleccionar los registros a actualizar.
-   **03_delete.sql**: Demuestra cómo eliminar registros de una tabla, utilizando la cláusula `DELETE` y `WHERE` para especificar qué registros deben ser eliminados.

## Módulo 03: Database (Gestión de Bases de Datos)

Este módulo se centra en la creación y eliminación de bases de datos completas.

-   **01_create_database.sql**: Explica cómo crear una nueva base de datos en el servidor MySQL.
-   **02_drop_database.sql**: Muestra cómo eliminar una base de datos existente, incluyendo todas sus tablas y datos.

## Módulo 04: Tables (Gestión de Tablas)

Este módulo aborda la creación, modificación y eliminación de tablas, así como la definición de relaciones entre ellas.

-   **01_create_table.sql**: Detalla cómo crear una tabla con diferentes tipos de datos para sus columnas y cómo aplicar restricciones (`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `CHECK`, `DEFAULT`, `AUTO_INCREMENT`) para asegurar la integridad de los datos.
-   **02_drop_table.sql**: Explica cómo eliminar una tabla existente de una base de datos.
-   **03_alter_table.sql**: Muestra cómo modificar la estructura de una tabla existente, incluyendo operaciones como `ADD` (añadir una nueva columna), `RENAME COLUMN` (renombrar una columna), `MODIFY COLUMN` (cambiar el tipo de datos o restricciones de una columna) y `DROP COLUMN` (eliminar una columna).
-   **04_relationships.sql**: Explica los diferentes tipos de relaciones entre tablas (1:1, 1:N, N:M y Auto-Referencia) y cómo implementarlas usando claves foráneas (`FOREIGN KEY`) para mantener la coherencia referencial. También incluye ejemplos de `INSERT` y `UPDATE` para poblar y gestionar datos en tablas relacionadas.

## Módulo 05: Join (Combinación de Datos)

Este módulo se dedica a las técnicas para combinar datos de múltiples tablas en una sola consulta.

-   **01_inner_join.sql**: Explica cómo combinar filas de dos o más tablas basándose en una columna relacionada, devolviendo solo las filas donde hay una coincidencia en todas las tablas involucradas.
-   **02_left_join.sql**: Muestra cómo combinar filas de dos tablas, devolviendo todos los registros de la tabla "izquierda" (la primera en la cláusula `FROM`) y los registros coincidentes de la tabla "derecha". Si no hay coincidencia, las columnas de la tabla derecha mostrarán `NULL`.
-   **03_right_join.sql**: Demuestra cómo combinar filas de dos tablas, devolviendo todos los registros de la tabla "derecha" y los registros coincidentes de la tabla "izquierda". Si no hay coincidencia, las columnas de la tabla izquierda mostrarán `NULL`.
-   **04_union.sql**: Explica cómo combinar los conjuntos de resultados de dos o más sentencias `SELECT` en un único conjunto de resultados. `UNION` elimina filas duplicadas, mientras que `UNION ALL` mantiene todas las filas, incluyendo duplicados.

## Módulo 06: Advanced (Conceptos Avanzados)

Este módulo introduce conceptos más avanzados para optimizar, automatizar y gestionar la base de datos.

-   **01_index.sql**: Detalla cómo crear y eliminar índices (`CREATE INDEX`, `DROP INDEX`) en columnas para acelerar la recuperación de datos en consultas. Se explica la diferencia entre índices normales y `UNIQUE INDEX`.
-   **02_triggers.sql**: Explica cómo crear triggers (`CREATE TRIGGER`), que son procedimientos almacenados que se ejecutan automáticamente en respuesta a eventos específicos (como `INSERT`, `UPDATE` o `DELETE`) en una tabla. Se muestra un ejemplo para registrar cambios de email en una tabla de historial.
-   **03_views.sql**: Muestra cómo crear y eliminar vistas (`CREATE VIEW`, `DROP VIEW`), que son tablas virtuales basadas en el conjunto de resultados de una consulta SQL. Las vistas simplifican consultas complejas y pueden usarse para seguridad.
-   **04_stored_procedures.sql**: Explica cómo crear y llamar procedimientos almacenados (`CREATE PROCEDURE`, `CALL`), que son bloques de código SQL precompilados y almacenados en la base de datos. Permiten encapsular lógica de negocio y mejorar el rendimiento. Se incluyen ejemplos con y sin parámetros.
-   **05_transactions.sql**: Detalla el concepto de transacciones, que son secuencias de operaciones que se ejecutan como una única unidad lógica. Se explica cómo usar `START TRANSACTION`, `COMMIT` (para guardar cambios permanentemente) y `ROLLBACK` (para deshacer cambios) para asegurar la atomicidad y consistencia de los datos.
-   **06_connectors.py**: Proporciona un ejemplo práctico de cómo conectar una aplicación Python a una base de datos MySQL utilizando la biblioteca `mysql.connector`. También ilustra cómo prevenir la inyección SQL mediante el uso de consultas parametrizadas.
