FROM node:16
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
