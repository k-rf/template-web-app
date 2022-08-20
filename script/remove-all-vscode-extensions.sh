#! /usr/bin/env bash

source .env

frontend=${FRONTEND_VSCODE_EXTENSIONS_VOLUME_NAME}
backend=${BACKEND_VSCODE_EXTENSIONS_VOLUME_NAME}
root=${ROOT_VSCODE_EXTENSIONS_VOLUME_NAME}

for volume in {${frontend},${backend},${root}}; do
  echo "Remove extensions in ${volume}"
  docker run --rm -v ${volume}:/mnt/${volume} ubuntu:latest /bin/bash -c "rm -rf /mnt/${volume}/*"
done
