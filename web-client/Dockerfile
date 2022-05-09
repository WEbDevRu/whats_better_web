FROM node:16.15.0-alpine

RUN apk add --no-cache git
RUN rm -rf /var/cache/apk/*
RUN git --version

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
