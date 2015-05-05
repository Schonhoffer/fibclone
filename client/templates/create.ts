/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />

/// <reference path="../../collections.d.ts"/>
/// <reference path="../service.ts"/>
var createTemplate = <Template>Template['create'];

createTemplate.events({
  'submit': function(event : Meteor.Event, template : Blaze.TemplateInstance) 
  {
    event.preventDefault();
    
    var command : CreateRoomCommand = {
      allowGeo: template.$('[name=allowGeo]').prop('checked'),
      nickname: template.$('[name=nickname]').val(),
      hostId: Session.get('playerId')
    };
    
    new FibcloneServiceClient().createRoom(command, function (error, gameId) {
      if (error) {
        alert(error.message);
      } else {
        Router.go('game', {_id: gameId});
      }
    });
  }
});