# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app to the container
COPY . .

# Copy the .env file into the container
COPY .env .env

# Build the React app
RUN npm run build

# Expose a port (usually 3000) for the app to run
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]