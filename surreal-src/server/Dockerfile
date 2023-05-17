# Specify the base image
FROM ubuntu:latest

# Set the working directory inside the container
WORKDIR /app

# Update and install necessary dependencies
RUN apt-get update && apt-get install -y curl unzip

# Install Deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

# Download the database
RUN curl -sSf https://install.surrealdb.com | sh

# Copy the handler.js and webserver.js files from the source code to the container
COPY handler.js .
COPY webserver.ts .

# Expose a port (change it to the appropriate port number)
EXPOSE 8090

# Start the webserver and database
# RUN surreal start --log debug --user root --pass root memory
# RUN deno run --allow-net webserver.ts

# Start 
CMD ["deno", "run", "--allow-net", "webserver.ts", " ; ",  "surreal", "start", "--log", "debug", "--user", "root", "--pass", "root", "memory"]
