FROM node:latest

WORKDIR /app

COPY . /app/

ARG PORT=19006

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN npm install

COPY . .

CMD ["expo", "start"]