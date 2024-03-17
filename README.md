# product-search

built with: Node.js, Express.js, MongoDB, Redis


## Install packages


```sh
npm i
```

## Build and start redis image

```sh
docker run --rm -p 6379:6379 -it --name cache redis/redis-stack-server:latest
```

NOTE: add .env file and add necessary environment variables into it.

## Start server

```sh
npm run dev
```
