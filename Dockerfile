FROM node:14-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

ENTRYPOINT [ "tini" ]
CMD [ "node", "/app/dist/main.js" ]
