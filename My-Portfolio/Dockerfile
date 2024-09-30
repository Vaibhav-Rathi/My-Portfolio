# Step 1: Use an official Node.js base image (alpine is lightweight)
FROM node:20-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./ 

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Build the Vite app for production
RUN npm run build

# Step 7: Use a smaller image for running the production build
FROM node:20-alpine AS runner

# Step 8: Set the working directory in the second stage
WORKDIR /app

# Step 9: Copy the build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Step 10: Set environment variables
ARG VITE_APP_EMAILJS_SERVICE_ID
ARG VITE_APP_EMAILJS_TEMPLATE_ID
ARG VITE_APP_EMAILJS_PUBLIC_KEY

ENV VITE_APP_EMAILJS_SERVICE_ID=${VITE_APP_EMAILJS_SERVICE_ID}
ENV VITE_APP_EMAILJS_TEMPLATE_ID=${VITE_APP_EMAILJS_TEMPLATE_ID}
ENV VITE_APP_EMAILJS_PUBLIC_KEY=${VITE_APP_EMAILJS_PUBLIC_KEY}

# Step 11: Expose the port the Vite app will run on
EXPOSE 5173

# Step 12: Start the Vite app using serve (install serve globally)
RUN npm install -g serve

# Step 13: Command to run the app
CMD ["serve", "-s", "dist"]
