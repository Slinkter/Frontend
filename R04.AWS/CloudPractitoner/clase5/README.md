# Clase 05

-   Amazon RDS
-   Amazon Aurora
-   AWS DMS
-   AWS SCTR

## Amazon RDS

-   servicio web que provee bd relaciones
-   servidor virtual en EC2
-   entrega datos de conexion
-   Oracle,postgresSQL,MySQL
-   Clases de Instancia de una DB
-   Disco : SSD,IOPS , magneticos
-   Escalamiento de base de datos
    -   cada zona de disponibilidad es independiente de otra zona
    -   AZ us-east-1a != AZ us-east-1b
    -   Modo Multi-AZ :
        -   Alta disponibiidad
        -   RDS Master y RDS Standby Replcia ,
        -   cada comite en RDS Master se copia al RDS SR
        -   en RDS SR solo es para lectura cuando esta activo el master
        -   alta disponibilidad si se cae el master,
        -   redicionar el trafico si cae el master
        -   no es igual es RDS READ Replicas (multi lectura)
    -   Amazon RDS Read Replicas
        -   Hay 01 master y varias replicas de lectura
        -   las replicas son asincronas
        -   util para dashboar (consultas)
        -   RDS DB replica (ambiente de lectura)
        -   Escalar verticual (CPU , RAM )
        -   Escalar horizontal (mas MV)
-   CREACION DE LA instalancia

### Login AWS RDS

-   Segurity group : Agrega rule de puerto 5432 para postgress
-

```sh

root@DESKTOP-4I1QOLP:/home/slinkter# psql -h max-instance.c3cgwe0gqst6.us-east-1.rds.amazonaws.com -U postgres -d postgres -p 5432
Password for user postgres: ** MUNDOverde20+**
psql (16.4 (Ubuntu 16.4-0ubuntu0.24.04.2), server 16.3)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

```

```sh
postgres-> \list
                                                       List of databases
   Name    |  Owner   | Encoding | Locale Provider |   Collate   |    Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+-------------+-------------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           |
 rdsadmin  | rdsadmin | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | rdsadmin=CTc/rdsadmin
 template0 | rdsadmin | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | =c/rdsadmin          +
           |          |          |                 |             |             |            |           | rdsadmin=CTc/rdsadmin
 template1 | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |            |           | =c/postgres          +
           |          |          |                 |             |             |            |           | postgres=CTc/postgres
(4 rows)
```

-   crear la base de datos **max** y salir ,luego volver a ingresar con a la base de datos **max**
-   psql -h ip_mv -U user_name -d db_name -p db_puerto

```sh
postgres=> CREATE DATABASE max;
CREATE DATABASE
postgres=> exit
slinkter@DESKTOP-4I1QOLP:~$ psql -h max-instance.c3cgwe0gqst6.us-east-1.rds.amazonaws.com -U postgres -d max -p 5432
Password for user postgres:
psql (16.4 (Ubuntu 16.4-0ubuntu0.24.04.2), server 16.3)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

max=> create table users(nombre varchar(50));
CREATE TABLE
max=> \d
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | users | table | postgres
(1 row)

max=>
```

-   creacion de replica de la base de datos de **max**

## Amazon Aurora

-   manejador de base de datos relacionas compatible con mysql y postgresql
-   Instancia primaria y replica , el storage se conecta para primaria
-   16 instancias de aurora
-   failover : cuando se cae la base datao primaria se va a otra base de datos (replica) en otra Availability zone
-   de los backup de postgres o mysql se puede subir a amazon aurora
-   3x mas rapido que postgres
-   5x mas rapdido que mysql

## AWS DMS

-   AWS database migration service
-   servicio que permite la migracion de base dataos dentro de aws
-   llevar datos on-promise (local ) a la nube (AWS)
-   hay 3 opciones
    -   Full Load
    -   full load-and cdc
    -   CDC
-   On-premise to Cloud
    -   DMS apuntar a db local
    -   DMS apuntar a db cloud
    -   el EC2 apuntar a la db cloud

## AWS SCTR

-   AWS schema conversion tool
-   cuando exista muchada data en local , usar AWS SCT
-   tiene costo alto
-   herramienta utilizada por dbas para cambiar de motor de base datos
-   cambia de esquema OLTE a DataWarehouse
-   Se instala en la pc local , es un programa para instalar
-   migracion heterogenia
-   migracion oracle ---> miracle postgres (que herramienta usar ? rpta AWS SCT)
