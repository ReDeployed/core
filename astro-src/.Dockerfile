# pull from nginx latest
FROM nginx/nginx:latest


RUN apt update && apt upgrade -y
RUN apt install deno node
RUN mkdir astro-site

# add files
ADD . astro-site/

# init
RUN cd astro-site/ && npm install && npm run build

# start deo
CMD cd astro-site/ && npm run denorun
