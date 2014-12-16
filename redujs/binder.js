var path = require('path');
var util = require('util');
var querystring = require('querystring');

module.exports = function(api) {
  this.api = api;

  this.bind_api = function(config) {

    var APIMethod = function(args) {
      var self = this;

      self.path = config['path'] || "";
      self.payload_type = config['payload_type'];
      self.method = config['method'] || 'get';
      self.query_params = config['query_params'] || [];
      self.payload_params = config['payload_params'] || [];
      self.send_type = config['send_type'] || self.payload_type;

      self.args = args;

      var tempDict = {};
      for (var param in self.query_params) {
        if (self.args.hasOwnProperty(param)) {
          tempDict[param] = self.args[param];
        }
      }
      self.url_arg = tempDict;
      tempDict = {};
      for (var param in self.payload_params) {
        if (self.args.hasOwnProperty(param)) {
          tempDict[param] = self.args[param];
        }
      }

      if (Object.keys(tempDict).length !== 0) {
        var tempDictAux = tempDict;
        tempDict = {};
        if (self.send_type) {
          tempDict[self.send_type] = tempDictAux;
        }
      }

      self.payload_arg = JSON.stringify(tempDict);

      self.execute = function(cb) {
        var uri = path.join(
          api.base_url,
          path.join(
            self.path,
            querystring.stringify(self.url_arg)
          )
        );

        uri = util.format(uri, self.args['id'] || '').split(" ")[0];
        var method = api.client[self.method];

        if (!method) {
          throw new Error("No method selected for request.");
        }

        var response = method(uri, self.payload_arg, function(err, result) {
          var retorno;
          if (self.payload_type) {
            result = JSON.parse(result);
            var tipo = self.api.model_factory[self.payload_type];
            var retorno = tipo();
            if (Array.isArray(result)) {
              retorno = [];
              for (var i in result) {
                var elem = tipo();
                retorno.push(elem.parse(result[i], self.api.model_factory))
              }
            } else {
              retorno.parse(result, self.api.model_factory)
            }
          }
          return cb(retorno);
        });
      }
    }

    return function(args, cb) {
      var method = new APIMethod(args);
      return method.execute(cb);
    }
  }
}
