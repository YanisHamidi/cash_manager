# Utilisation de l'image Node.js LTS (14.x au moment de la rédaction)
FROM node:latest

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . /app/

# Installer les dépendances
RUN npm install
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5432
# Commande pour démarrer l'application Nest.js
CMD ["npm", "start"]
