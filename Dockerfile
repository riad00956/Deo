# Base Image
FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Run the bot hosting server
CMD ["node", "server.js"]