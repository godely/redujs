var request = require('request');
var OAuth2 = require('oauth').OAuth2;

module.exports = function(consumer_key, consumer_secret, base_url) {

  var self = this;

  self.redu = new OAuth2(
    consumer_key,
    consumer_secret,
    base_url,
    '/oauth/authorize',
    '/oauth/token',
    {
      'Content-type': 'application/json'
    }
  );

  self.redu.setAccessTokenName('oauth_token');

  self.consumer_key = consumer_key;
  self.consumer_secret = consumer_secret;

  self.initClient = function(pin, callback) {
    self.redu.getOAuthAccessToken(
      pin,
      {'grant_type': 'authorization_code'},
      function (e, access_token, refresh_token, results){
        self._accessToken = access_token;
        return callback(e, access_token);
      }
    );
  }

  self.getAuthUrl = function() {
    return this.redu.getAuthorizeUrl({});
  }

  self.get = function(url, payload, callback) {
    self.redu._request('GET', url, {}, payload, self._accessToken, callback);
  }

  self.post = function(url, payload, callback) {
    self.redu._request('POST', url, {}, payload, self._accessToken, callback);
  }

  self.delete = function(url, payload, callback) {
    self.redu._request('DELETE', url, {}, payload, self._accessToken, callback);
  }

  self.put = function(url, payload, callback) {
    self.redu._request('PUT', url, {}, payload, self._accessToken, callback);
  }
}
