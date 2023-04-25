# Basisimage
FROM node:16.10.0-alpine

# Arbeitsverzeichnis erstellen
WORKDIR /app
# Abhängigkeiten kopieren und installieren
COPY . .
RUN npm install -g @angular/cli@14.2.10
# Startbefehl
CMD [ "ng", "serve", "--host", "0.0.0.0" ]
