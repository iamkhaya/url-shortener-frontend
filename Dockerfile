# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent -g pnpm
RUN pnpm install --silent
RUN pnpm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# this will be environment driven
ENV NODE_ENV=development

# expose app port
EXPOSE 3006

# start app
CMD npm start
