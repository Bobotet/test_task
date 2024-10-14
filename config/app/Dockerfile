FROM node:22.0.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "npm run migration:run && npm run start"]


