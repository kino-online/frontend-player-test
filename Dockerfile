FROM nginx:alpine
WORKDIR /app
COPY dist/ilampa/ .
COPY nginx.conf /etc/nginx/nginx.conf
