Template.lie.helpers({
  'hasSubmittedLie': function(){
    var query = {gameId: this.round.gameId, round: this.round.round};
    query['options.'+Session.get('playerId')] = {$exists: true};
    return !!GameRounds.findOne(query);
  }
});

Template.lie.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var params = {
     gameId: this.game._id,
     lie: template.$('[name=lie]').val(),
     playerId: Session.get('playerId')
    };
    
    Meteor.call('addLie', params, function (error, result) {
      if (error) {
        if (error.error === "lie-is-the-truth") {
          alert('That lie is the truth');
        }
        else{
          alert(error.message);
        }
        
      } else {
        //tell them it's been submitted, show waht the put, show a timer?
      }
    });
  },
  'click .btn-warning': function(event, template) {
    event.preventDefault();
    
    var params = {
     gameId: this.game._id
    }
    
    Meteor.call('startGuessing', params, function (error, result) {
      if (error) {
          alert(error.message);
      }
      else{console.log('started guessing');}
    });
  }
});