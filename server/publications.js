Meteor.publish('games', function(playerId) {
  check(playerId, String);
  var query = {};
  query['players.'+playerId] = {$exists: true};
  return Games.find(query);
});

Meteor.publish('gameRounds', function(gameId) {
  check(gameId, String);
  var round = 0;
  var game = Games.findOne({_id:gameId});
  
  if(game){
    round = game.round;
  }
  
  return GameRounds.find({gameId: gameId, round: {$lte: round}});
});