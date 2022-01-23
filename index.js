const cloneDeepWith = require('lodash/cloneDeepWith');

class Plugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'after:package:compileEvents': this.beforeCreateDeploymentArtifacts.bind(this),
    };
  }

  beforeCreateDeploymentArtifacts() {
    const baseResources = this.serverless.service.provider.compiledCloudFormationTemplate;

    // console.log('service:', this.serverless.service);
    // console.log('provider:', JSON.stringify(this.serverless.service.provider, null, 2));

    this.serverless.service.provider.compiledCloudFormationTemplate =
      cloneDeepWith(baseResources,
        (value, key, object) => { // (value [, index|key, object, stack])
          if (
            value === 'AWS::Lambda::EventSourceMapping' &&
            object.Properties.EventSourceArn.includes('kinesis')
          ) {
            // yes i know this is a side effect
            object.Properties.ServiceToken = {
              'Fn::Join': [
                ':',
                [
                  'arn:aws:lambda',
                  this.serverless.service.provider.region,
                  {
                    Ref: 'AWS::AccountId'
                  },
                  'function',
                  this.serverless.service.custom?.cfn?.esm ?
                    this.serverless.service.custom.cfn.esm :
                    `custom-resources-${this.serverless.service.provider.stage}-esm`
                ]
              ]
            };

            return 'Custom::EventSourceMapping';
          } else {
            return undefined;
          }
        });
  }
}

module.exports = Plugin;