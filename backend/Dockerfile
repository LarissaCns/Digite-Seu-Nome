FROM node:18-alpine

# Diretório
WORKDIR /app

# Copiar os arquivos de dependência e instalar
COPY package*.json ./
RUN npm install

# Copiar o resto do código da aplicação
COPY . .

# Porta da Aplicação
EXPOSE 3001

# Comando para iniciar o servidor
CMD [ "npm", "start" ]