# nginx dockerfile is much simpler than proxy dockerfile

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]