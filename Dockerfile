# Stage 0, based on Node.js, to build and compile Angular
FROM node:14.17.0 as node14
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /app
COPY package.json /app/
RUN npm install
RUN npm install -g @angular/cli@9.1.15

EXPOSE 4200
COPY ./ /app/
RUN ng build -- --no-aot --no-build-optimizer


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node14 /app/dist/ /usr/share/nginx/html
COPY ./docker_nginx.conf /etc/nginx/conf.d/default.conf
