# pull from nginx latest
FROM denoland/deno:alpine

# change workdir
WORKDIR /app

# The port that your application listens to.
EXPOSE 8085

# Prefer not to run as root.
USER deno

# add files
ADD ./dist .

# start deno
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "./server/entry.mjs"]
