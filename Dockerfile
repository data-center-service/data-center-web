FROM keymetrics/pm2:8-alpine as builder
MAINTAINER  zhouyu muyu.zhouyu@gmail.com
COPY package.json .
COPY package-lock.json .
COPY src src/
COPY web.conf .
COPY .eslintrc.js .
COPY .editorconfig .
RUN npm install
RUN npm run build

FROM daocloud.io/library/nginx:1.13.0-alpine
COPY --from=builder dist dist/
COPY --from=builder web.conf etc/nginx/conf.d/