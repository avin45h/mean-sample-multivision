describe('mvUser',function(){
   beforeEach(module('app'));

    describe('isAdmin',function(){
        it('should Return a false if the roles array doesnt have an admin array',inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;

        }))
    });

});