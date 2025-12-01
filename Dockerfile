FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3000

ENV GEMINI_API_KEY=${GEMINI_API_KEY}
ENV NODE_ENV=production

CMD ["npm", "start"]
