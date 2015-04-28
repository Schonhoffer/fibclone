Meteor.publish('games', function(playerId) {
  check(playerId, String);
  var query = {};
  query['players.'+playerId] = {$exists: true};
  return Games.find(query);
});

Meteor.publish('gameRounds', function(playerId, gameId) {
  check(gameId, String);
  check(playerId, String);
  
  return GameRounds.find({gameId: gameId, players: playerId});
});