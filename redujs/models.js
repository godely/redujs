var Model = function() {
  this.links = null;
  this.created_at = null
  this.updated_at = null;
  this.id = null;

  this._parse = function(data, modelFactory) {
    for (var v in this) {
      if (this[v]) {
        var value = this[v];
        if (v == "created_at" || v == "updated_at") {
          stringdate = value.match(/\d+-\d+-[T\d]+:\d+:\d+/)[0];
          var strptime = require('micro-strptime.js').strptime;
          value = strptime(stringdate, "%Y-%m-%dT%H:%M:%S")
        } else if (modelFactory && modelFactory.hasOwnProperty(v)) {
          var tipo = modelFactory[v];
          var inner = tipo();
          inner.parse(value, modelFactory)
          value = inner
        }
        this[v] = value;
      }
    }
  }
}

var User = function() {
  this.login = null;
  this.mobile = null;
  this.email = null;
  this.localization = null;
  this.friends_count = null;
  this.last_name = null;
  this.first_name = null;
  this.birthday = null;
  this.birth_localization = null;
  this.social_networks = null;
}
User.prototype = new Model();
User.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
  if (data.hasOwnProperty('birthday')) {
    this.birthday = new Date(data['birthday']);
  }
}

var Subject = function() {
  this.title = null;
  this.description = null;
  this.created_at = null;
}
Subject.prototype = new Model();
Subject.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var Environment = function() {
  this.name = null;
  this.initials = null;
  this.path = null;
}
Environment.prototype = new Model();
Environment.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var Status = function() {
  this.type = null;
  this.user = null;
  this.text = null;
}
Status.prototype = new Model();
Status.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var Enrollment = function() {
  this.token = null;
  this.state = null;
  this.email = null;
}
Enrollment.prototype = new Model();
Enrollment.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var Space = function() {
  this.name = null;
  this.description = null;
}
Space.prototype = new Model();
Space.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var Course = function() {
  this.name = null;
  this.created_at = null;
  this.workload = null;
  this.path = null;
}
Course.prototype = new Model();
Course.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

var ChatMessage = function() {
  this.message = null;
}
ChatMessage.prototype = new Model();
ChatMessage.prototype.parse = function(data, modelFactory) {
  this._parse(data, modelFactory);
}

module.exports = function() {
  this.user = User;
  this.course = Course;
  this.space = Space;
  this.enrollment = Enrollment;
  this.status = Status;
  this.environment = Environment;
  this.subject = Subject;
  this.chat = Model;
  this.chat_message = ChatMessage;
}
