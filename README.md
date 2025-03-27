# backend-service

## Overview

Handles image uploads and retrieval, storing images in MongoDB using GridFS. Provides endpoints for uploading and serving images.

## Prerequisites

<details><summary><b>Show Prerequisites</b></summary>

- Docker (for containerization)
- Node.js (for development)

</details>

## Commands

<details><summary><b>Show Commands</b></summary>

### Setup

- Create the Docker network:

  ```sh
  docker network create my-network
  ```

### Build

- Build the Docker image:

  ```sh
  docker build -t backend-service .
  ```

### Run

- Run the container:

  ```sh
  docker run -d -p 3002:3002 --network my-network --env-file .env backend-service
  ```

### Debugging

- Check logs:

  ```sh
  docker logs <container-id>
  ```

### Environment Variables

- Create a .env file with:
  ```diff
  MONGO_URI=mongodb://admin:admin@backend-db:27017/sketch-app
  PORT=3001
  ```

</details>

## Migrate images from a directory

<details><summary><b>Extra Commands</b></summary>

### Install library

- Check for Axios, Form-data and mongodb to use GridFSBucket

  ```sh
  npm install axios form-data mongodb
  ```

### Run

- run migrate script to copy files into mongodb

  ```sh
  node migrate-images.js
  ```

### Check uploads

- replace with your username and password

  ```sh
  docker exec -it mongodb mongosh -u username -p password --authenticationDatabase admin
  ```

- run in order to find image metadata

  ```sh
  use auth-service
  show collections
  db.images.files.find()
  ```

</details>
