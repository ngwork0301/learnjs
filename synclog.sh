#!/bin/bash -xe
aws --profile admin s3 sync s3://learnjs-logging.ngwork0301.com/ logs
