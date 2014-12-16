var HttpClient = require('./HttpClient');
var Binder = require('./binder');
var ModelFactory = require('./models');

module.exports = function(consumer_key, consumer_secret, pin, base_url, model_factory) {
  var self = this;
  self.client = new HttpClient(consumer_key, consumer_secret, pin, base_url);
  self.base_url = base_url;
  self.model_factory = model_factory || (new ModelFactory());
  self.binder = new Binder(self);

  self.getAuthorizeUrl = function() {
    return self.client.getAuthorizeUrl();
  }

  self.initClient = function(pin, callback) {
    self.client.initClient(pin, callback);
  }

  self.getMe = self.binder.bind_api({
    path: 'me',
    method: 'get',
    payload_type: 'user'
  });

  self.getUser = self.binder.bind_api({
    path: 'users/%d',
    method: 'get',
    payload_type: 'user'
  });

  self.getUserBySpace = self.binder.bind_api({
    path: 'spaces/%d/users',
    method: 'get',
    payload_type: 'user'
  });

  self.getEnvironment = self.binder.bind_api({
    path: 'environments/%d',
    method: 'get',
    payload_type: 'environment'
  });

  self.postEnvironment = self.binder.bind_api({
    path: 'environments',
    method: 'post',
    payload_type: 'environment',
    payload_params: ['name', 'path', 'initials',
    'description']
  });

  self.editEnvironment = self.binder.bind_api({
    path: 'environments/%d',
    method: 'put',
    send_type: 'environment',
    payload_params: ['name', 'path', 'initials',
    'description']
  });

  self.deleteEnvironment = self.binder.bind_api({
    path: 'environments/%d',
    method: 'delete'
  });

  self.getSubjectBySpace = self.binder.bind_api({
    path: 'spaces/%d/subjects',
    method: 'get',
    payload_type: 'subject'
  });

  self.getSubject = self.binder.bind_api({
    path: 'subjects/%d',
    method: 'get',
    payload_type: 'subject'
  });

  self.getSpace = self.binder.bind_api({
    path: 'spaces/%d',
    method: 'get',
    payload_type: 'space'
  });

  self.editSpace = self.binder.bind_api({
    path: 'spaces/%d',
    method: 'put',
    payload_params: ['name', 'description'],
    send_type: 'space'
  });

  self.postSpace = self.binder.bind_api({
    path: 'courses/%d/spaces',
    method: 'post',
    payload_type: 'space',
    payload_params: ['name', 'description']
  });

  self.getSpaceByCourse = self.binder.bind_api({
    path: 'courses/%d/spaces',
    method: 'get',
    payload_type: 'space'
  });

  self.deleteSpace = self.binder.bind_api({
    path: 'spaces/%d',
    method: 'delete'
  });

  self.getStatus = self.binder.bind_api({
    path: 'statuses/%d',
    method: 'get',
    payload_type: 'status'
  });

  self.getAnswers = self.binder.bind_api({
    path: 'statuses/%d/answers',
    method: 'get',
    payload_type: 'status'
  });

  self.postAnswer = self.binder.bind_api({
    path: 'statuses/%d/answers',
    method: 'post',
    payload_type: 'status',
    payload_params: ['text']
  });

  self.getStatusByUser = self.binder.bind_api({
    path: 'users/%d/statuses',
    method: 'get',
    payload_type: 'status',
    query_params: ['type', 'page']
  });

  self.getTimelineByUser = self.binder.bind_api({
    path: 'users/%d/statuses/timeline',
    method: 'get',
    payload_type: 'status',
    query_params: ['type', 'page']
  });

  self.postStatusByUser = self.binder.bind_api({
    path: 'users/%d/statuses',
    method: 'post',
    payload_type: 'status',
    query_params: ['text']
  });

  self.getTimelineBySpace = self.binder.bind_api({
    path: 'spaces/%d/statuses/timeline',
    method: 'get',
    payload_type: 'status',
    query_params: ['type', 'page']
  });

  self.getStatusBySpace = self.binder.bind_api({
    path: 'spaces/%d/statuses',
    method: 'get',
    payload_type: 'status',
    query_params: ['type', 'page']
  });

  self.postStatusSpace = self.binder.bind_api({
    path: 'spaces/%d/statuses',
    method: 'post',
    payload_type: 'status',
    query_params: ['text']
  });

  self.getStatusByLecture = self.binder.bind_api({
    path: 'lectures/%d/statuses',
    method: 'get',
    payload_type: 'status',
    query_params: ['type', 'page']
  });

  self.postStatusLecture = self.binder.bind_api({
    path: 'lectures/%d/statuses',
    method: 'post',
    payload_type: 'status',
    query_params: ['text']
  });

  self.deleteStatus = self.binder.bind_api({
    path: 'statuses/%d',
    method: 'delete'
  });

  self.getCourse = self.binder.bind_api({
    path: 'courses/%d',
    method: 'get',
    payload_type: 'course'
  });

  self.postCourse = self.binder.bind_api({
    path: 'environments/%d/courses',
    method: 'post',
    payload_type: 'course',
    query_params: ['name', 'path', 'description', 'workload']
  });

  self.editCourse = self.binder.bind_api({
    path: 'courses/%d',
    method: 'put',
    send_type: 'course',
    payload_params: ['name', 'path', 'description', 'workload']
  });

  self.getCoursesByEnvironment = self.binder.bind_api({
    path: 'environments/%d/courses',
    method: 'get',
    payload_type: 'course'
  });

  self.deleteCourse = self.binder.bind_api({
    path: 'courses/%d',
    method: 'delete'
  });

  self.getEnrollment = self.binder.bind_api({
    path: 'enrollments/%d',
    method: 'get',
    payload_type: 'enrollment'
  });

  self.postEnrollment = self.binder.bind_api({
    path: 'courses/%d/enrollments',
    method: 'post',
    payload_type: 'enrollment',
    payload_params: ['email']
  });

  self.getEnrollmentsByCourse = self.binder.bind_api({
    path: 'courses/%d/enrollments',
    method: 'get',
    payload_type: 'enrollment'
  });

  self.deleteEnrollment = self.binder.bind_api({
    path: 'enrollments/%d',
    method: 'delete'
  });

  self.getChatsByUser = self.binder.bind_api({
    path: 'users/%d/chats',
    method: 'get',
    payload_type: 'chat'
  });

  self.getChat = self.binder.bind_api({
    path: 'chats/%d',
    method: 'get',
    payload_type: 'chat'
  });

  self.getChatMessagesByChat = self.binder.bind_api({
    path: 'chats/%d/chat_messages',
    method: 'get',
    payload_type: 'chat_message'
  });

  self.getChatMessage = self.binder.bind_api({
    path: 'chat_messages/%d',
    method: 'get',
    payload_type: 'chat_message'
  });
}
