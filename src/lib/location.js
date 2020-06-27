/**
 * urlParamByName
 * @description Fetch a URL param by it's name
 */

function urlParamByName({ url, name }) {
  const search = url.split('?')[1];

  if ( typeof search !== 'string' ) return;

  const params = search.split('&').map(keyvalue => {
    const split = keyvalue.split('=');
    return {
      key: split[0],
      value: split[1]
    }
  });

  return params.find(param => param.key === 'code')?.value;
}

module.exports.urlParamByName = urlParamByName;