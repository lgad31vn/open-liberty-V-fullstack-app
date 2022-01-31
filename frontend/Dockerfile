## Stage 1:
## -------------------------------------------------------
## It build the front end application to prepare it for stage 2. 
## The image created at this stage will be discarded.

## 1. Specify a base image
FROM node:alpine as my-app-frontend

## Create working directory and copy the app before running yarn install
WORKDIR  /front-end
COPY front-end .