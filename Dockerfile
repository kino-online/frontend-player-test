FROM nginx:alpine
WORKDIR /app
COPY dist/ .
COPY nginx.conf /etc/nginx/nginx.conf
