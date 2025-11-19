FROM node:20-alpine

WORKDIR /app

# Kopírování definic závislostí
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku aplikace
COPY . .

# Build aplikace (pro produkci bychom použili multi-stage, pro dev stačí toto)
CMD ["npm", "run", "dev"]