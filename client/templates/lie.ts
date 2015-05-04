/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />

/// <reference path="../../collections.d.ts"/>

Template['lie'].helpers({
  'hasSubmittedLie': function(){
    var round = this.round || {gameId: '', roundNumber: 0};
    var query = {gameId: round.gameId, round: round.roundNumber};
    query['options.'+Session.get('playerId')] = {$exists: true};
    return !!GameRounds.findOne(query);
  }
});

Template['lie'].events({
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