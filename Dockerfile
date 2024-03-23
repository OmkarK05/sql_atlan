# Use a node base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using npm ci (faster and more reliable for production)
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Run the build command
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
