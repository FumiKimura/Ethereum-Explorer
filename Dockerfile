FROM node
ENV NODE_ENV = "development"
WORKDIR /
COPY package*.json .
RUN npm install --only=production
COPY . .
EXPOSE 9000
CMD npm run start-app