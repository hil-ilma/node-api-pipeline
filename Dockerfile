FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tests ./test
COPY . .

RUN npm install



COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh
CMD ["./wait-for-db.sh", "node", "src/index.js"]
