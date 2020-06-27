const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST'
};

/**
 * parsePayloadContent
 * @description Take the request body, parse it, and validate content
 */

function parsePayloadContent(body) {

  if ( typeof body !== 'string' ) {
    throw new Error('Failed to parse content: Invalid body');
  }

  let content;

  try {
    content = JSON.parse(body);
  } catch(e) {
    content = {};
  }

  return content;

}

module.exports.parsePayloadContent = parsePayloadContent;


/**
 * handleSuccess
 * @description Handles any logging and callback on success
 */

function handleSuccess(message, data = {}) {

  const success = {
    message: `${message}`,
    data
  }

  console.log(success.message);

  return {
    statusCode: 200,
    body: JSON.stringify(success),
    headers
  }

}

module.exports.handleSuccess = handleSuccess;


/**
 * handleError
 * @description Handles any logging and callback on error
 */

function handleError(message, data = {}) {

  const error = {
    error: `Error: ${message}`,
    data
  }

  console.log(error.error);

  return {
    statusCode: 500,
    body: JSON.stringify(error),
    headers
  };

}

module.exports.handleError = handleError;