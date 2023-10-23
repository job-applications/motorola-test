# Start from the official Ubuntu image
FROM ubuntu:jammy

# Set environment variables to non-interactive (this prevents some prompts)
ENV DEBIAN_FRONTEND=non-interactive

# Install Node.js (v18) and other dependencies
RUN apt-get update && \
    apt-get install -y curl build-essential libcairo2-dev libpango1.0-dev libjpeg8-dev libgif-dev librsvg2-dev && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize the cache of npm packages
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "preview"]
