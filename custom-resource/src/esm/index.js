import Connector from '../connectors/lambda';
import { getEnvironment, handlerWrapper, wait } from '../utils';

const handler = (event, context) => {
  console.log('event: %j', event);
  console.log('context: %j', context);

if (event.RequestType === 'Create') {
    return create(event, context);
  } else if (event.RequestType === 'Update') {
    return update(event, context);
  } else if (event.RequestType === 'Delete') {
    return remove(event, context);
  }
  throw new Error(`Unhandled RequestType ${event.RequestType}`);
};

const create = (event, context) => {
};

const update = (event, context) => {
};

const remove = (event, context) => {
};

export const handle = handlerWrapper(handler, 'CustomResourceEventSourceMapping'); // eslint-disable-line import/prefer-default-export
