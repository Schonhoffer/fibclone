Template.guess.helpers({
  answers: function() {
    var gameId = this.game._id;
    return _.map(this.round.options, function(value, key){
      return {optionId: key, text: value, gameId: gameId};
    });
  },
  hasSubmittedGuess: function(){
    var query = {gameId: this.round.gameId, round: this.round.round};
    query['answers.'+Session.get('playerId')] = {$exists: true};
    return !!GameRounds.findOne(query);
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
    },
  'click .btn-warning': function(event, template) {
    event.preventDefault();
    
    var params = {
     gameId: this.game._id
    }
    
    Meteor.call('finishGuessing', params, function (error, result) {
      if (error) {
          alert(error.message);
      }
      else{console.log('finished guessing');}
    });
  }
});