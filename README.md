# serverless-kinesis-esm-plugin

Avoid the dreaded AWS Lambda Kinesis Event Source Mapping throttling error.

> "Invalid request provided: Received Exception while reading from provided stream. Rate exceeded for shard shardId-000000000000 in stream my-event-hub-stg-s1"

This error happens when you have too many functions consuming from the same stream. This is most acute in a shared development account where functions are not busy doing real work and spend most of their time polling kinesis.

This fixes the out of the box AWS::Lambda::EventSourceMapping resource type that does not seem to perform any retries.

## Install

First, create a stack for the custom resource using this [template](https://github.com/jgilbert01/serverless-kinesis-esm-plugin/blob/master/custom-resource).

Then install and configure the plugin that updates your stack to use the custom resource:

```
npm install serverless-kinesis-esm-plugin --save-dev
```

## serverless.yml

> Optional settings are commented out

```
plugins:
  - serverless-kinesis-plugin

custom:
  cfn:
    esm: 
      function: my-custom-resources-${opt:stage}-esm
      # enabled: stg # comma separated list of stages

functions:
  listener:
    handler: index.handle
    events:
      - stream:
          type: kinesis
          arn: arn:aws:kinesis:region:XXXXXX:stream/foobar
```
