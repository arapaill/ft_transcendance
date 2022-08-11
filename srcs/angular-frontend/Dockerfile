FROM node:18-alpine

WORKDIR /usr/src/app/
COPY package*.json .
RUN npm ci
RUN npm install -g @angular/cli
COPY --chown=node:node . .

USER node

CMD [ "ng", "serve", "--host", "0.0.0.0" ]