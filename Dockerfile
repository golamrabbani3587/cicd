FROM node:16.0.0

RUN mkdir -p /src/app
WORKDIR /src/app

# Install app dependencies
COPY package.json /src/app
RUN npm install

COPY . .
EXPOSE 9540
CMD [ "node", "index.js" ]