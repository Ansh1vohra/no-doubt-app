# Use official lightweight Node.js runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Expose port 5000 (though Render will assign its own dynamic port mapped via process.env.PORT)
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
