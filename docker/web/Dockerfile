FROM node:16.16.0-alpine as build

COPY ./packages/frontend /mnt/

WORKDIR /mnt/

RUN npm config set unsafe-perm true
RUN npm install pnpm -g
RUN rm -rf node_modules
RUN pnpm install \
    && pnpm run build

# CMD ["npm", "run", "dev"]
