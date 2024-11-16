FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:alpine AS run

COPY --from=build /app/dist ./dist

CMD ["node", "dist/client/server/server.mjs"]

