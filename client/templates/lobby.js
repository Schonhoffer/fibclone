Template.lobby.helpers({
  playersArray: function() {
    return _.values(this.players);
  },
  canStartGame: function() {
    return Session.get('playerId') == this.hostId
      && _.size(_.values(this.players)) > 1;
  }
});
  
  
  Template.lobby.events({
    'click #startGameButton': function(){
      Meteor.call('setStep', 0, function (error, roomId) {
        if (error) {
          alert('couldn\'t start game');
        } else {
          Router.go('lobby', {_id: roomId});
        }
      });
    }
  
  });
  