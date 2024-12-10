# Use the official Node.js image as the base
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 3006

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
