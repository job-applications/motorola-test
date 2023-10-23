# Use the official Node 18 image as a base
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize the cache of npm packages
COPY package*.json ./

# Install system dependencies
RUN apt-get update && \
    apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libjpeg-turbo8

# Install project dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "preview"]
