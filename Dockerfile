FROM node:latest
USER root

# Run create app directory
RUN mkdir -p /usr/src/app

# Define the working dircetory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/



# Install nodejs 
RUN npm install



# Copy Source Code from current directory
# To /app directory
COPY . /usr/src/app

# Expose the application PORT
EXPOSE 3338

CMD [ "npm", "start" ]