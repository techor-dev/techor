FROM node:19-alpine

ADD package.json /action/
RUN cd /action && pnpm i

ADD src /action/src
ENTRYPOINT ["node", "/action/src/index.js"]
