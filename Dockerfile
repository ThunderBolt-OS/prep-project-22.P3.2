FROM node:12.22.9 as build

ARG API_KEY

# copy the react app to the container
WORKDIR /app

COPY ./package.json . 
COPY ./package-lock.json . 

RUN npm install 

COPY . .

# ENV

EXPOSE 3000
CMD ["npm", "start"]

