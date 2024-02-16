

# FROM node:16.16.0-alpine as build

# COPY ./packages/frontend /mnt/

# WORKDIR /mnt/

# RUN npm config set unsafe-perm true
# RUN npm install pnpm -g
# RUN pnpm install \
#     && pnpm run build

FROM nginx:1.22-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./docker/nginx/*.conf /etc/nginx/conf.d/

WORKDIR /mnt/

COPY --from=build /mnt/dist /mnt/dist/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
