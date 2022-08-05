FROM node:latest
WORKDIR /usr/src/app

# D'abord les package pour installer les dépendances.
COPY package*.json .
# On s'assure d'avoir les dependances installée puis go dans le bon folder, apparement ci est plus léger et recommandé pour les 
# build automatiques par rapport a npm install
RUN npm ci
# Ensuite le reste de l'application
COPY --chown=node:node . .
# Ca construit le projet, et crée un dossier dist avec l'application finale
RUN npm run build

#User pour la sécurité, et apparement des librairies optimise le bail quand NODE_ENV est init a production
USER node
ENV NODE_ENV production

# la on lance l'application en gros
CMD [ "node", "dist/main.js" ]
