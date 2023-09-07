FROM node:16

RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "pnpm-lock.yaml", "./"]

RUN pnpm install

# Bundle app source
COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
