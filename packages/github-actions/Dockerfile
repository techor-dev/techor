FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ADD package.json /action/
RUN cd /action && pnpm i

ADD src /action/src
ENTRYPOINT ["node", "/action/src/index.js"]
