FROM node:16.0.0

WORKDIR /usr/src/app.json ./
COPY package*.json ./*
RUN npm install
COPY . .
EXPOSE 4441
CMD [ "node", "index.js" ]
