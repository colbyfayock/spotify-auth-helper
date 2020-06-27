const axios = require('axios');

const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

function contructLoginUrl({ scope }) {
  const params = [];

  if ( typeof scope !== 'string' ) {
    throw new Error('Invalid scope');
  }

  params.push('response_type=code');
  params.push(`client_id=${SPOTIFY_CLIENT_ID}`)
  params.push(`scope=${scope}`)
  params.push(`redirect_uri=${SPOTIFY_REDIRECT_URI}`)

  return `${SPOTIFY_LOGIN_URL}?${params.join('&')}`;
}

module.exports.contructLoginUrl = contructLoginUrl;

/**
 * postRequestToken
 */

async function postRequestToken({ code }) {
  const { data } = await axios({
    method: 'post',
    url: SPOTIFY_TOKEN_URL,
    params: {
      grant_type: 'authorization_code',
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) || {};

  return data;
}

module.exports.postRequestToken = postRequestToken;