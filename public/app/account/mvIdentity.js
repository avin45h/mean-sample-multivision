angular.module('app').factory('mvIdentity',function($window,mvUser){
    var currentUser;
    if(!!window.bootstrappedUserObject){
        currentUser = new mvUser();
        angular.extend(currentUser,$window.bootstrappedUserObject);
    }
    return {
        currentUser : currentUser,
        isAuthenticated : function(){
            return !!this.currentUser && !!this.currentUser.userName;
        },
        isAuthorized : function(role){
            return !!this.currentUser && !!currentUser.roles.indexOf('admin') > -1
        }
    }
});