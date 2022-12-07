FROM nginx
COPY ./dist/  /usr/share/nginx/html/
COPY ./dockerCfg/nginx/nginx.conf /ect/nginx/nginx.conf