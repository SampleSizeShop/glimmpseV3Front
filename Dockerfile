# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.6 as node
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /app
COPY package.json /app/
RUN npm install puppeteer --save-dev
RUN npm install
RUN npm i -D puppeteer karma-chrome-launcher
COPY ./ /app/
ARG env=prod
RUN npm run build -- --prod --environment $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./docker_nginx.conf /etc/nginx/conf.d/default.conf
