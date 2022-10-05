# Petites précision

Pour lancer les container, faut faire la commande "docker compose up -d".
Si jamais on change un bail dans le docker-compose, ou bien dans les .env,
ou bien dans les dockerfiles, faut faire "docker compose up -d --build".
pour stopper les containers et restart le bail (changer un truc ou jsp
vérifier que c'est bien persistant) faut faire "docker compose down".

Enfait faut changer les variables dans le .env qui sont spécifiée dans le docker-compose
si jamais vous voulez changer le mdp.

Pour installer le serveur de la base de donnée Posgres sur PGadmin et pouvoir tout gérer
depuis l'interface web, suffit de suivre ce tuto :
https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5

Mais en gros c'est assez simple, tu te connecte a PGadmin (localhost:5050 de base), et la 
tu te connecte avec l'email et le mdp contenu dans le .env. Une fois que t'es connecté,
faut faire :
- clic droit sur Serveur dans le menu déroulant -> Ajouter serveur
- choisir un nom, c'est pas important
- aller dans l'onglet connection
- mettre le Hostname (case tout au dessus)
- pour trouver le hostname faut faire "docker ps" dans le terminal reprendre l'ID du 
container postgres (les trois premières lettres suffisent).
- taper "docker inspect [ID du container, ou les 3 premiers caractère de l'ID] | grep IPAddress",
 mettre ce qui se trouve dans l'ID dans le Hostname
- vérifier que le nom d'utilisateur et le mdp correspondent a ceux de la DB contenu dans le .env
- et hop après tu peux rajouter des bases de données au truc et les gérer

Normalement tout est persistant, malhereusement comme à chaque docker down et docker up -d
 on change les adresse IP reliées a chaque container, ben va falloir relier PGadmin a la 
 base de donnée a chaque fois
