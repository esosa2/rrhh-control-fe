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

# Construye la aplicación
RUN npm run build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos generados al directorio de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponer el puerto 3000 para servir la aplicación
EXPOSE 3000

# Arranca Nginx
CMD ["nginx", "-g", "daemon off;"]
