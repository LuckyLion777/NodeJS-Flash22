FROM nginx:1.11.10

ADD nginx.conf /etc/nginx/nginx.conf
ADD blockuseragents.rules /etc/nginx/blockuseragents.rules
ADD dhparam.pem /etc/nginx/ssl/
ADD ssl/* /etc/nginx/ssl/
ADD www/* /usr/share/nginx/html

EXPOSE 443 80
