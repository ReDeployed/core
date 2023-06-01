# Specify the base image
FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the source to the container
COPY deno-src/src .

# Start 
CMD ["deno", "run", "--unstable", "--allow-net", "--allow-read", "webserver.ts"]
