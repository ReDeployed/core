# from deno alpine latest
FROM denoland/deno:alpine

# Add npm
RUN apk update && \
    apk add npm

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY astro-src/package.json .
COPY astro-src/package-lock.json .
COPY astro-src/astro.config.mjs .

# Copy all files from src/
COPY astro-src/src ./src

# Install dependencies and build
RUN npm install
RUN npm run build

# Start deno
CMD ["npm", "run", "denorun"]
