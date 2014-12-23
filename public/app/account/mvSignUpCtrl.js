angular.module('app').controller('mvSignUpCtrl',function($scope,mvAuth,$location,mvUser,mvNotifier){
    $scope.signUp = function(){
        var newUserData = {
            userName: $scope.userName,
            password: $scope.password,
            firstName : $scope.firstName,
            lastName : $scope.lastName
        };

        console.log($scope);
        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User Account Created!');
            $location.path('/')
        },function(reason){
            mvNotifier.error(reason);
        });
    };
});