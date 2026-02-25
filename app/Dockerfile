FROM node:18-slim
# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias usando el comodín para el lock
COPY package*.json ./

# Ejecutamos la instalación
RUN npm install --only=production

# Copiamos el resto de la aplicación
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]