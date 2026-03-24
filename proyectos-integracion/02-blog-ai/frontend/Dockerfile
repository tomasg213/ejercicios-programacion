FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY astro.config.mjs ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["npm", "run", "dev"]
