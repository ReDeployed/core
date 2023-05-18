# Specify the base image
FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the source to the container
COPY deno-src/src .

# Expose a port (change it to the appropriate port number)
EXPOSE 8080

# Start 
CMD ["deno", "run", "--allow-net", "--allow-read", "webserver.ts"]
