FROM node:18-alpine

WORKDIR /usr/src/app/
COPY package*.json .
RUN npm install -g @angular/cli @angular-devkit/build-angular
RUN npm ci
COPY --chown=node:node . .

USER node

CMD [ "npm", "start"]