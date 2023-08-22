FROM node:16.0.0

WORKDIR /usr/src/app.json ./
RUN npm install
COPY package*.json ./*
COPY . .
EXPOSE 4441
CMD [ "node", "index.js" ]