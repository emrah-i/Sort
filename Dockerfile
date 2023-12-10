FROM node as build-stage
WORKDIR /sort
COPY /sorting/package.json ./
RUN npm install
COPY /sorting/src ./src
COPY /sorting/public ./public
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /sort/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]