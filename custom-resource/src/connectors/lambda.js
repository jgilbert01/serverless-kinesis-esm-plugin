/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { config, Lambda } from 'aws-sdk';
import Promise from 'bluebird';

config.setPromisesDependency(Promise);

class Connector {
  constructor() {
    this.lambda = new Lambda({
      httpOptions: {
        timeout: 6000,
      },
      logger: { log: /* istanbul ignore next */ msg => console.log(msg) },
      maxRetries: 6,
    });
  }

  createEventSourceMapping(params) {
    return this.lambda.createEventSourceMapping(params).promise()
      .tap(console.log)
      .tapCatch(console.log);
  }

  updateEventSourceMapping(params) {
    return this.lambda.updateEventSourceMapping(params).promise()
      .tap(console.log)
      .tapCatch(console.log);
  }

  deleteEventSourceMapping(params) {
    return this.lambda.deleteEventSourceMapping(params).promise()
      .tap(console.log)
      .tapCatch(console.log);
  }
}

export default Connector;
