FROM node:latest

WORKDIR /usr/src/app/
COPY package*.json .
RUN npm install -g npm@8.16.0
RUN npm install -g @angular/cli
COPY --chown=node:node . .
RUN npm run build
USER node

CMD [ "ng", "serve", "--host", "0.0.0.0" ]