FROM node:11.15.0-alpine as build-step
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine as prod-stage
COPY --from=build-step /usr/src/app/dist/risc /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]