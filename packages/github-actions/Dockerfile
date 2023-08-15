FROM node:20-slim AS base

ADD package.json /action/
RUN cd /action && npx pnpm i

ADD src /action/src
ENTRYPOINT ["node", "/action/src/index.js"]
