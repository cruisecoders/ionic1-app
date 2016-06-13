angular.module('app.projectX').service('projectApi', [ '$http', '$q', 'EnvironmentConfig', '$resource', function ($http, $q, EnvironmentConfig, $resource) {

  var genResource = $resource(EnvironmentConfig.api + ':type/:id', {id:'@id'});

  function createResource(type){
      var resourceType = genResource.bind({type : type});
      return new resourceType();
  };

  function getResource(type, id, params){
      //call backend to get resources
      var options = angular.extend({id:id}, params);
      return genResource.bind({type: type}).get(options).$promise;
  };

   function submitBookingForm(booking){
      return $http.post(EnvironmentConfig.api + "submitBooking", booking , {});
   }

   function cancelBooking(id){
      return $http.post(EnvironmentConfig.api + "cancelBooking/"+id, {} , {});
   }

   function submitCustomerData(customerDataList){
      return $http.post(EnvironmentConfig.dataApi + "pushCustomerData", customerDataList , {});
   }

  return {
    createResource : createResource,
    getResource : getResource,
    submitBookingForm : submitBookingForm,
    cancelBooking : cancelBooking,
    submitCustomerData : submitCustomerData
  };

}]);