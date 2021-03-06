Template.create.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var params = {
      allowGeo: template.$('[name=allowGeo]').prop('checked'),
      nickname: template.$('[name=nickname]').val(),
      hostId: Session.get('playerId')
    };
    
    Meteor.call('createRoom', params, function (error, gameId) {
      if (error) {
        alert(error.message);
      } else {
        Router.go('game', {_id: gameId});
      }
    });
  }
});