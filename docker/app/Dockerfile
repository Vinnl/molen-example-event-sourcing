FROM node:8-alpine
LABEL Name="Molen example app local environment" \
      Version="1.0.0"
ENV NODE_ENV=development
WORKDIR /usr/src/app
# Needed for one of the npm dependencies (fibers, when compiling node-gyp):
RUN apk add --no-cache python make g++
COPY ["./package.json", "yarn.lock", "/usr/src/app/"]
EXPOSE 3000
RUN ["yarn"]
CMD ["yarn", "run", "watch"]
