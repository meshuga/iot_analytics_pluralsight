#!/usr/bin/env bash

AWS_PROFILE=personal
AWS_DEFAULT_REGION=ap-northeast-1
S3_CODE_BUCKET=iot-lambda-code-repo
export AWS_PROFILE
export AWS_DEFAULT_REGION

npm install --prefix ./analytics-transform --cwd ./analytics-transform &&
sam build &&
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket ${S3_CODE_BUCKET} &&
sam deploy --template-file ./packaged.yaml --stack-name AnalyticalPipeline --capabilities CAPABILITY_IAM