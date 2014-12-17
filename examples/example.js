var Redu = require('../redujs/api');

var redu = new Redu("consumer_key", "consumer_secret", "http://base_url/");

redu.initClient("pin", function(error, access_token) {
  if (!error) {
    console.log("Você está conectado e pode começar a utilizar a API.");
    redu.getUser({id: 2}, function(object) {
      //object é um user com id 2
    });
  }
});
