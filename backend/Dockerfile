# Imagen base con Node.js
FROM node:18

# Crear carpeta de la app dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend (ejemplo: 3001)
EXPOSE 3001

# Comando para correr la app
CMD ["npm", "run", "start"]
