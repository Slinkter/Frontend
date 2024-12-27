# Pruebas

# Eliminar la carpeta node_modules

rm -rf node_modules

# Eliminar el archivo package-lock.json

rm package-lock.json
rm pnpm-lock.yaml

# Limpiar la caché de npm

npm cache clean --force

# Reinstalar las dependencias

pnpm install

# Eliminar archivos de construcción

rm -rf dist
