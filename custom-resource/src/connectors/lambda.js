/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { config, Lambda } from 'aws-sdk';
import Promise from 'bluebird';

config.setPromisesDependency(Promise);

class Connector {
  constructor({
    debug,
    timeout = Number(process.env.LAMBDA_TIMEOUT) || Number(process.env.TIMEOUT) || 6000,
  }) {
    this.debug = debug;
    this.lambda = new Lambda({
      httpOptions: {
        timeout,
        // agent: sslAgent,
      },
      logger: { log: /* istanbul ignore next */ msg => this.debug(msg) },
    });
  }

  createEventSourceMapping(params) {
    return this.lambda.createEventSourceMapping(params).promise()
      .tap(this.debug)
      .tapCatch(this.debug);
  }

  updateEventSourceMapping(params) {
    return this.lambda.updateEventSourceMapping(params).promise()
      .tap(this.debug)
      .tapCatch(this.debug);
  }

  deleteEventSourceMapping(params) {
    return this.lambda.deleteEventSourceMapping(params).promise()
      .tap(this.debug)
      .tapCatch(this.debug);
  }
}

export default Connector;
