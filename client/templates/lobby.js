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
      
      var params = {
        round: 1,
        roomId: this._id
      };
      
      Meteor.call('setRound', params, function (error, roomId) {
        if (error) {
          alert('couldn\'t start game');
        } else {
        }
      });
    }
  
});
  