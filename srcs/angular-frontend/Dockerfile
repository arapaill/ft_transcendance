FROM node:18-alpine

WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install -g @angular/cli @angular-devkit/build-angular
RUN npm install node-gyp -g
RUN npm install bcrypt -g
RUN npm install bcrypt --save
RUN npm install bcrypt
RUN npm ci
COPY --chown=node:node . .

EXPOSE 4200

CMD ["ng","serve", "--host","0.0.0.0", "--poll", "2000"]