# This docker file uses node user to avoid running proecesses as root

# Lean Distro
FROM node:8.9.3-alpine

# Full Distro
# FROM node:8.9.3

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
WORKDIR /home/node/backend
COPY package*.json /home/node/backend/

RUN yarn global add gulp-cli

# Wrokaround: gulp-nodemon fails to install using this distro. We need to post install it to force it.
RUN yarn install && yarn add gulp-nodemon 

EXPOSE 4000

USER node