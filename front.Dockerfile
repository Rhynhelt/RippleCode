FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# docker prerender uneeded for a static spa
RUN npx ng build --configuration production --prerender=false --ssr=false 

RUN set -eux; \
    mkdir -p /out; \
    IDX="$(find dist -type f -name index.html | head -n1)"; \
    [ -n "$IDX" ] || (echo "No index.html under dist/"; ls -R dist; exit 1); \
    cp -r "$(dirname "$IDX")"/. /out

FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
