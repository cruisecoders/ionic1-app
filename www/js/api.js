angular.module('app.projectX').service('projectApi', function ($http, $q, CONTEXT_URL, $resource) {

  var genResource = $resource(CONTEXT_URL.url + ':type/:id', {id:'@id'});

  function createResource(type){
      var resourceType = genResource.bind({type : type});
      return new resourceType();
  };

  function getResource(type, id, params){
      //call backend to get resources
      var options = angular.extend({id:id}, params);
      return genResource.bind({type: type}).get(options).$promise;
  };

  return {
    createResource : createResource,
    getResource : getResource
  };

});