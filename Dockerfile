FROM node:16

WORKDIR /app

ARG NODE_ENV=production

ENV NODE_ENV $NODE_ENV

COPY package*.json ./

RUN NODE_ENV=$NODE_ENV npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
