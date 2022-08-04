FROM node:latest
WORKDIR /usr/src/app

# Vous l'aurez compris, il suffit d'avoir son application dans un dossier (ici "projtest") et puis ca la lancera
# Le flag ici c'est pour être sur que l'user qu'on désire a les permissions sur le dossier. Ici l'user c'est node
# ici faut juste changer projtest en le path pour accéder à ton application, et elle sera copiée sur le container.
COPY --chown=node:node . .
# On s'assure d'avoir les dependances installée puis go dans le bon folder, apparement ci est plus léger et recommandé pour les 
# build automatiques par rapport a npm install
RUN npm ci
# Ca construit le projet, et crée un dossier dist avec l'application finale
RUN npm run build

#User pour la sécurité, et apparement des librairies optimise le bail quand NODE_ENV est init a production
USER node
ENV NODE_ENV production

# la on lance l'application en gros
CMD [ "node", "dist/main.js" ]
