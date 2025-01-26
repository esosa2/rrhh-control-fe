# Usa una imagen base de Node.js para la construcción
FROM node:18-alpine AS build

# Crea el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Exponer el puerto en el que React corre
EXPOSE 3000

# Ejecutar en modo de desarrollo (npm start)
CMD ["npm", "start"]
