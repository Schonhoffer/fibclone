/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />

/// <reference path="../../collections.d.ts"/>

Template['create'].events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var command : CreateRoomCommand = {
      allowGeo: template.$('[name=allowGeo]').prop('checked'),
      nickname: template.$('[name=nickname]').val(),
      hostId: Session.get('playerId')
    };
    
    Meteor.call('createRoom', command, function (error, gameId) {
      if (error) {
        alert(error.message);
      } else {
        Router.go('game', {_id: gameId});
      }
    });
  }
});