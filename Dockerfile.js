# Use an official Node runtime as a parent image
FROM node:22.4.0

# Set the working directory in the container
WORKDIR /src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD [ "npm", "start" ]