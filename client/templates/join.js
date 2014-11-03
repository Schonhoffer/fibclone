Template.join.events({
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
          alert('couldn\'t join game');
        }
        
      } else {
        Router.go('lobby', {_id: roomId});
      }
    });
  }
});