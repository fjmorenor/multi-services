FROM node:18-slim

# Directorio de trabajo simple
WORKDIR /app

# Copiamos TODO lo que hay en la carpeta app al contenedor
COPY . .

# Instalamos sin flags complicados para evitar errores de permisos
RUN npm install

# Exponemos el puerto que usa tu código
EXPOSE 8080

# Comando de arranque
CMD ["node", "index.js"]