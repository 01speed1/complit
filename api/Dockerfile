FROM node:20

WORKDIR /code

COPY package*.json ./

RUN npm install -g pnpm \
  && npm install -g @nestjs/cli

COPY . .

EXPOSE 3001

CMD ["pnpm", "start:dev"]
