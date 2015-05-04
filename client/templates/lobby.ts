/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/underscore.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/jquery.d.ts" />

/// <reference path="../../collections.d.ts"/>

var lobbyTemplate = Template['lobby'];

lobbyTemplate.helpers({
  playersArray: function() {
    return _.values(this.players);
  },
  canStartGame: function() {
    return Session.get('playerId') == this.hostId
      && _.size(_.values(this.players)) > 0;
  }
});
  
lobbyTemplate.events({
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

lobbyTemplate.rendered = function() {
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
  