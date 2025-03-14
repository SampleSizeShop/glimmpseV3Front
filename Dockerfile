# Stage 0, based on Node.js, to build and compile Angular
FROM node:20.13.0-alpine as node20
ENV NPM_CONFIG_LOGLEVEL error
ENV NODE_OPTIONS=--max_old_space_size=2048
WORKDIR /app
COPY package.json /app/
RUN npm install --force
RUN npm install -g @angular/cli@17.3.8

EXPOSE 4200
COPY ./ /app/
RUN ng build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node20 /app/dist/ /etc/nginx/html
COPY ./docker_nginx.conf /etc/nginx/conf.d/default.conf
