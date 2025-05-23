FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh
CMD ["./wait-for-db.sh", "node", "src/index.js"]
