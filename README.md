# serverless-kinesis-esm-plugin

Avoid the classic AWS Lambda Event Source Mapping (esm) deployment Kinesis throttling error.

Serverless plugin for kinesis event source mapping custom resource.

Serverless plugin to copy secrets from a CI/CD pipeline environment to AWS Secrets Manager.

All the secrets are stored together, so that they can be accessed with a single API calls.
The environment variables are grouped into a JSON object and base64 encoded.

## serverless.yml

> Optional settings are commented out

```
plugins:
  - serverless-kinesis-plugin


```
