FROM nginx

WORKDIR /app

COPY conf/project.conf /etc/nginx/conf.d/default.conf

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
