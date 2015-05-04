/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />

/// <reference path="../../collections.d.ts"/>

Template['join'].events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var params = {
     roomCode: template.$('[name=code]').val().toUpperCase(),
     nickname: template.$('[name=nickname]').val(),
     playerId: Session.get('playerId')
    };
    
    Meteor.call('joinRoom', params, function (error, roomId) {
      if (error) {
        if (error.error === "game-code-not-found") {
          alert('couldn\'t find game');
        }
        else{
          alert(error.message);
        }
        
      } else {
        Router.go('game', {_id: roomId});
      }
    });
  }
});