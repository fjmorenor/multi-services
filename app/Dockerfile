FROM node:18-slim

# Directorio de trabajo en la raíz del contenedor
WORKDIR /app

# Copiamos todo
COPY . .

# ESTO ES PARA DEPURAR: Nos dirá si el package.json está ahí realmente
RUN ls -la

# Instalación limpia
RUN npm install --no-audit --no-fund

EXPOSE 8080
CMD ["node", "index.js"]