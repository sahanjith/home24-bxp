# build the app
FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# serve the built files with a static NGINX server
FROM nginx:alpine

# copy built files from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]