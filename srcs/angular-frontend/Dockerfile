FROM node:18-alpine

WORKDIR /usr/src/app/
<<<<<<< HEAD
COPY package*.json .
=======
COPY package*.json ./
>>>>>>> 897604e0ffffb5b180bef276cff5e77cef531eaf
RUN npm install -g @angular/cli @angular-devkit/build-angular
RUN npm ci
COPY --chown=node:node . .

EXPOSE 4200

CMD ["ng","serve", "--host","0.0.0.0", "--poll", "2000"]