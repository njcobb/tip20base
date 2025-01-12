# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy the backend and frontend files into the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 80
EXPOSE 80

# Start the server (adjust path to your server.js file)
CMD ["node", "backend/server.js"]
