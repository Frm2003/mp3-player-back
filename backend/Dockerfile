FROM node

WORKDIR /app_backend

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]