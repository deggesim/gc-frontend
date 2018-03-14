#!/bin/bash

env=""
target=""
if [ "$1" != "" ]; then
    if [ "$1" = "--prod" ]; then
        echo "Mode: PROD"
        env="--environment prod"
        target="--target production"
    elif [ "$1" = "--dev" ]; then
        echo "Mode: DEV"
        env="--environment dev"
        target="--target development"
    else
        echo "Unknown option"
        exit 1
    fi
else
    echo "Default mode: PROD"
    env="--environment prod"
    target="--target production"
fi

echo "ng build $env $target --sourcemaps false"
ng build $env $target --sourcemaps false