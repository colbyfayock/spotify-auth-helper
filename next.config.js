module.exports = {
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': {
        page: '/',
        query: {
          code: 'spotify-authorization-code'
        }
      }
    };
  }
};