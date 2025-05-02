FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN bun install

RUN bun prisma generate

RUN bun prisma db push

RUN bun build

CMD ["yarn", "start"]