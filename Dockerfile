# pull the Node.js Docker image
FROM node:20.11-alpine
# create the directory inside the container
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm i

# copy the generated modules and all other files to the container
COPY . .

# RUN npm run build

# our app is running on port 5000 within the container, so need to expose it
# EXPOSE 3000

# the command that starts our app
# CMD ["./startup.sh"]
# CMD ["node", "index.js"]
# CMD ["node", "./dist/main.js"]