Template.guess.helpers({
  answers: function() {
    return _.map(this.round.answers, function(value, key){
      return {answerId: key, text: value, gameId: this.game._id};
    });
  }
});

Template.guess.events({
    'click button': function(event, template){
      
      var params = {
        playerId: Session.get('playerId'),
        gameId: this.gameId,
        answerId: this.answerId
      };
      
      Meteor.call('addGuess', params, function (error, roomId) {
        if (error) {
          alert('couldn\'t add guess');
        } else {
        }
      });
    }
});