FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize the cache of npm packages
COPY package*.json ./

#  add libraries; sudo so non-root user added downstream can get sudo
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    librsvg-dev \
    libtool \
    autoconf \
    automake

# Install project dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "preview"]
