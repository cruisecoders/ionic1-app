angular.module('app.projectX')
  .controller('bookingCtrl', function($scope){
	     
       $scope.model ="";
       $scope.clickValueModel = "";
       $scope.removeValueModel = "";

       $scope.getTestItems = function (query) {
        if (query) {
            return {
              items: [{
                id: "1",
                name: query + "1",
                view: "view:" + query + "1"
              },{
                id: "2",
                name: query + "2",
                view: "view" + query + "2"               
              },{
                id: "1",
                name: query + "2",
                view: "view"  + query + "3"
              }]
          };
       }
       return {items: []}; 
     };

     $scope.itemClicked = function (callback) {
        $scope.clickValueModel = callback;
     }
     $scope.itemRemoved = function (callback) {
        $scope.removeValueModel = callback;
     }
});