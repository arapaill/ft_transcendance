FROM node:18-alpine

WORKDIR /usr/src/app/
COPY package*.json .
RUN npm install -g @angular/cli
RUN npm install -g npm@8.16.0
COPY --chown=node:node . .

USER node

CMD [ "ng", "serve", "--host", "0.0.0.0" ]