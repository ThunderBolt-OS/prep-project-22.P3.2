FROM node:12.22.9 as build

ARG API_KEY

# copy the react app to the container
WORKDIR /app

COPY ./package.json . 
COPY ./package-lock.json . 

RUN npm install 

COPY . .

ENV REACT_APP_APIKEY=9d7d138cd8ff66ea1859ffc272777df2 
ENV REACT_APP_FIREBASE_API_KEY=AIzaSyD_AWvTBwuMx32ifxDVESI3iIJYNaICQZ4 
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=mlh-prep-project-2085e.firebaseapp.com
ENV REACT_APP_FIREBASE_PROJECT_ID=mlh-prep-project-2085e
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=mlh-prep-project-2085e.appspot.com
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1025137595009
ENV REACT_APP_FIREBASE_APP_ID=1:1025137595009:web:d2f55e8c209069f04c3380

EXPOSE 3000
CMD ["npm", "start"]

