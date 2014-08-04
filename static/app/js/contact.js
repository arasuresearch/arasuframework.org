//https://docs.angularjs.org/api/ngResource/service/$resource
//https://docs.angularjs.org/tutorial/step_11
//http://www.jacopretorius.net/2013/04/using-ngresource-with-angularjs.html
//http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/

var rrr = angular.module('contacts', ['ngResource']);


rrr.factory('contacts', ['$http','$resource', function ($http,$resource, collection) {
  var path = 'app/js/contacts.json';
  var contacts = $http.get(path).then(function (resp) {
    return resp.data.contacts;
  });


  var factory = {};
  factory.all = function () {
    return contacts;
  };

  factory.get = function (id) {
    return contacts.then(function(){
      return collection.findById(contacts, id);
    })
  };
  return factory;
}]);

rrr.factory('Contact', function($resource) {
  return $resource('/contacts/:id',{ id: '@id' },{ update: { method: 'PUT' }});
});
