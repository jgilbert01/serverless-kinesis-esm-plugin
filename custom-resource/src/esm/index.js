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
  const { ServiceToken, ...ResourceProperties } = event.ResourceProperties;
  ResourceProperties.Enabled = ResourceProperties.Enabled === 'true';
  ResourceProperties.BisectBatchOnFunctionError = ResourceProperties.BisectBatchOnFunctionError === 'true';

  return (new Connector())
    .createEventSourceMapping(ResourceProperties)
    .then((data) => {
      event.PhysicalResourceId = data.UUID;
      return data;
    });
};

const update = (event, context) => {
  const { ServiceToken, ...ResourceProperties } = event.ResourceProperties;
  ResourceProperties.Enabled = ResourceProperties.Enabled === 'true';
  ResourceProperties.BisectBatchOnFunctionError = ResourceProperties.BisectBatchOnFunctionError === 'true';
  delete ResourceProperties.StartingPosition; // StartingPositionTimestamp
  delete ResourceProperties.EventSourceArn;

  return (new Connector()).updateEventSourceMapping({
    UUID: event.PhysicalResourceId,
    ...ResourceProperties,
  });
};

const remove = (event, context) => (new Connector())
  .deleteEventSourceMapping({ UUID: event.PhysicalResourceId })
  .catch(/* istanbul ignore next */(err) => {
    if (err.code === 'ResourceNotFoundException') {
      return {};
    }
    return Promise.reject(err);
  });

export const handle = handlerWrapper(handler); // eslint-disable-line import/prefer-default-export
