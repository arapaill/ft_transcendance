###################################
### BUILD FOR LOCAL DEVELOPMENT ###
###################################

FROM node:18-alpine AS development
WORKDIR /usr/src/app
RUN chown node:node ../app
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
# D'abord les package pour installer les dépendances.
COPY --chown=node:node package*.json .
# On s'assure d'avoir les dependances installée, apparement ci est plus léger et recommandé pour les 
# build automatiques par rapport a npm install
RUN npm ci
# Ensuite le reste de l'application
COPY --chown=node:node . .
USER node
RUN npm run prisma:generate
# Ca construit le projet, et crée un dossier dist avec l'application finale
#User pour la sécurité, et apparement des librairies optimise le bail quand NODE_ENV est init a production

############################
### BUILD FOR PRODUCTION ###
############################

FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
# Le only production c'est pour optimiser pour être sur que tout est optimisé pour le production stage
RUN npm ci --only=production && npm cache clean --force

USER node
ENV NODE_ENV production

##################
### PRODUCTION ###
##################

FROM node:18-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# la on lance l'application en gros
CMD [ "node", "dist/main.js" ]
