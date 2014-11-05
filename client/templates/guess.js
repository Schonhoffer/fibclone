Template.guess.helpers({
  answers: function() {
    var gameId = this.game._id;
    return _.map(this.round.answers, function(value, key){
      return {optionId: key, text: value, gameId: gameId};
    });
  }
});

Template.guess.events({
    'click button': function(event, template){
      
      var params = {
        playerId: Session.get('playerId'),
        gameId: this.gameId,
        optionId: this.optionId
      };
      
      Meteor.call('addGuess', params, function (error, result) {
        if (error) {
          alert(error.message);
        } else {
        }
      });
    }
});