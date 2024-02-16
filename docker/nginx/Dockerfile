

FROM nginx:1.22-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

WORKDIR /mnt/

COPY --from=build /mnt/dist /mnt/dist/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
