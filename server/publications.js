Meteor.publish('games', function(playerId) {
  check(playerId, String);
  var query = {};
  query['players.'+playerId] = {$exists: true};
  return Games.find(query);
});

Meteor.publish('gameRounds', function(gameId) {
  check(gameId, String);
  var gameIdToSearch = '';
  var game = Games.findOne({_id:gameId});
  if(game != null){
    gameIdToSearch = game._id;
  }
  return GameRounds.find({gameId: gameIdToSearch, round: { $lte: game.round}});
});