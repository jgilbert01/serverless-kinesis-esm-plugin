module.exports.handle = (event, context, callback) => {
  console.log('event: %j', event);
  console.log('context: %j', context);
  console.log('env: %j', process.env);
  
  callback(null, 'success');
};
