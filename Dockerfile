# syntax=docker/dockerfile:1

# Vue application
FROM node:20-alpine3.18 as stage
WORKDIR /app/

# Install dependencies
COPY ./package.json /app/package.json
RUN npm install

# Copy source app
COPY ./index.html /app/index.html
COPY ./jsconfig.json /app/jsconfig.json
COPY ./package-lock.json /app/package-lock.json
COPY ./vite.config.js /app/vite.config.js
COPY ./public /app/public
COPY ./src /app/src

# Build application (dist)
RUN npm run build


# Nginx server
FROM nginx:stable
COPY --from=stage /app/dist /usr/share/nginx/html

EXPOSE 80

# To run in `docker-compose.yaml` use this ->
#   command: ninx -g 'daemon off;'

CMD [ "nginx", "-g", "daemon off;" ]
