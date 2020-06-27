require('dotenv').config();
const axios = require('axios');

const { parsePayloadContent, handleSuccess, handleError } = require('../lib/request');
const { postRequestToken } = require('../lib/spotify');

/**
 * handler
 * @description Lambda handler
 */

async function handler(event = {}, context) {
  const { headers, body} = event;

  const { code } = parsePayloadContent(body) || {};

  if ( !code ) {
    return handleSuccess('Ok');
  }

  const data = await postRequestToken({
    code
  }) || {};

  return handleSuccess('Ok', data);
}

exports.handler = handler;