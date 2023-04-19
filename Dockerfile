FROM node:16.20-slim

WORKDIR /var/melody/

COPY .npmrc package.json package-lock.json ./

RUN npm ci

COPY .eslintrc.json \
    next.config.js \
    postcss.config.js \
    tailwind.config.js \
    tsconfig.json ./


COPY src/ ./src/
COPY public/ ./public/

ARG API_PROTOCOL
ENV NEXT_PUBLIC_API_PROTOCOL=$API_PROTOCOL

ARG API_HOSTNAME
ENV NEXT_PUBLIC_API_HOSTNAME=$API_HOSTNAME

ARG API_PORT
ENV NEXT_PUBLIC_API_PORT=$API_PORT

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]