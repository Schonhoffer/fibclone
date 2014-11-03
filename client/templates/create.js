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
        alert('couldn\'t create game');
      } else {
        Router.go('lobby', {_id: gameId});
      }
    });
  }
});