FROM node:16.16.0-alpine as build

COPY ./packages/backend /mnt/

WORKDIR /mnt/
RUN rm -rf node_modules
RUN npm install pnpm -g
RUN pnpm install


EXPOSE 3000

CMD ["npm", "run", "start"]
