FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --production=false; \
        fi

COPY . ./
EXPOSE 5000
CMD ["npm","run","dev"]