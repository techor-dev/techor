FROM node:20-slim AS base

ADD package.json /
RUN npx pnpm i

ENTRYPOINT ["node", "/src/index.js"]
