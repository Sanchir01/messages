FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN apk --no-cache add bash git  curl

RUN curl -fsSL https://bun.sh/install | bash && \
    export BUN_INSTALL="$HOME/.bun" && \
    export PATH="$BUN_INSTALL/bin:$PATH"

 ENV PATH="/root/.bun/bin:$PATH"

RUN bun install

RUN bun prisma generate

RUN bun run build

CMD ["bun", "start"]