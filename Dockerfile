FROM node:lts-alpine as build-stage
WORKDIR /
COPY package*.json .
RUN npm install
COPY ./src ./src
COPY ./public ./public
ENV REACT_APP_BACKEND_BASE_URL="http://localhost:8080"
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
