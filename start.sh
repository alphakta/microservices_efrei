#!/bin/bash

cd authors-service
nodemon index.js &
cd ../books-service
nodemon index.js &
cd ../authors-service
nodemon index.js &