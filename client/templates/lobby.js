Template.lobby.helpers({
  playersArray: function() {
    return _.values(this.players);
  },
  canStartGame: function() {
    return Session.get('playerId') == this.hostId
      && _.size(_.values(this.players)) > 0;
  }
});
  
Template.lobby.events({
    'click #startGameButton': function(){
      
      var params = {
        round: 1,
        gameId: this._id
      };
      
      Meteor.call('setRound', params, function (error, result) {
        if (error) {
          alert(error.message);
        } else {
        }
      });
    }
});

Template.lobby.rendered = function() {
  this.find('#lobbyPlayersList')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
};
  