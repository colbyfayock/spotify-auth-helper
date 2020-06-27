require('dotenv').config();
const { parsePayloadContent, handleSuccess, handleError } = require('../lib/request');
const { contructLoginUrl } = require('../lib/spotify');

/**
 * handler
 * @description Lambda handler
 */

async function handler(event = {}, context, callback) {
  const { headers, body } = event;

  const { scope } = parsePayloadContent(body) || {};

  if ( !scope ) {
    return handleSuccess('Ok');
  }

  console.log('scope', scope)

  const url = contructLoginUrl({
    scope
  });

  return handleSuccess(url);
}

exports.handler = handler;
