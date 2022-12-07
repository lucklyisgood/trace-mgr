FROM nginx
COPY ./  /usr/share/nginx/html/
COPY ../dockerCfg/nginx/nginx.conf /ect/nginx/nginx.conf