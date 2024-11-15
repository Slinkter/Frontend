apuntes Cicd-taller-1.md

llevar contenedore a producion

-   Metodologia CI/CD
    -   CI: continuis integrecion : integracion de codigo con otros
    -   CD : continuis delivery : deploy constante a producion
-   Casa de uso :
    -   desde un repositario se deposita en container y el DevOps
    -   tiene que automatizar
    -   100 personas trabjando para crear varios microservicios(facturacion, generar pdf)
    -   los equipos quiere enviar su codigo a production a diario (deploy)
    -   Toma mucho tiempo si s manual para el Devops
    -

# CI con cicle ci

# CI con AWS : 1:10:58

ssh -i "linux.pem" ec2-user@ec2-35-173-244-108.compute-1.amazonaws.com

1. AWS CodeCommit (~github)
2. AWS CodeBuild (~CI)
3. AWS CodePipeline (junta el 1. y 2. )
4. AWS ECR (~DockerHub)

### 1. AWS CodeCommit
