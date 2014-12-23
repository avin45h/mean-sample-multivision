angular.module('app').controller('mvUserListCtrl',function($scope, mvUser){
    $scope.users = mvUser.query();
    console.log("==================");
    console.log($scope.users);
    console.log("==================");
});