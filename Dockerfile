FROM node

RUN mkdir app

WORKDIR app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]