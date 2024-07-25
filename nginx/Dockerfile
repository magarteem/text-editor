FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY ./default.conf /etc/nginx/templates/default.conf.template

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]