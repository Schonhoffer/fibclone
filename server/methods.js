Meteor.methods({
  createRoom: function (params) {
    check(params.allowGeo, Boolean);
    check(params.hostId, String);
    check(params.nickname, String);
    
    var players = {};
    players[params.hostId] = {
      playerId: params.hostId,
      nickname: params.nickname
    };
      
    var gameId = Games.insert({
      createdAt: new Date(),
      allowGeo: params.allowGeo,
      hostId: params.hostId,
      roomCode: generateRoomCode(),
      round: 0,
      players: players
    });
    console.log('created new room: ' + gameId);
    
    GameRounds.insert({
      round: 1,
      gameId: gameId,
      question: "What is the answer?",
      options: {"truth": "42"},
      answers: {},
      truthValue: 1000,
      lieValue: 500
    })
    
    return gameId;
  },
  
  joinRoom: function (params) {
    check(params.roomCode, String);
    check(params.playerId, String);
    check(params.nickname, String);
    
    console.log('Looking for room code: ' + params.roomCode);
    var game = Games.findOne({roomCode:params.roomCode});
    
    if(game == null){
      console.log('Could not find game with room code: ' + params.roomCode);
      throw new Meteor.Error("game-code-not-found", "Could not find a game for that game code.");
    }
    console.log('Found game with room code: ' + params.roomCode, ', gameId: '+ game._id);
    
    if(game.round != 0){
      console.log('Could not join game that has already started' + game._id);
      throw new Meteor.Error("game-already-started", "Can not join game that has already started.");
    }
    
    console.log('Adding player to game: ' + params.playerId, ', nickname: '+ params.nickname);
    var setNewPlayer = {};
    setNewPlayer["players." + params.playerId] =  {
      playerId: params.playerId,
      nickname: params.nickname
    };
    Games.update({_id: game._id}, { $set: setNewPlayer });
    
    return game._id;
  },
  setRound: function(params){
    check(params.round, Match.Integer);
    check(params.gameId, String);
    
    console.log('Looking for room id: ' + params.gameId);
    var game = Games.findOne({_id:params.gameId});
    
    if(game == null){
      console.log('Could not find game with game id: ' + params.gameId);
      throw new Meteor.Error("game-not-found", "Could not find a game for that game id.");
    }
    
    if(params.round -1 == game.round){
      Games.update({_id: game._id}, { $set: {round: params.round, roomCode: null}});
      //todo: should be using $min
      GameRounds.update({gameId: game._id, round: params.round}, { $set: {whenRoundStarted: new Date()}}); 
    }
    
  },
  addLie: function(params){
    check(params.gameId, String);
    check(params.playerId, String);
    check(params.lie, String);
    
    var game = Games.findOne({_id:params.gameId});
    var round = GameRounds.findOne({gameId:game._id,round: game.round});
    
    var setnewOption = {};
    setnewOption["options." + params.playerId] =  params.lie;
    GameRounds.update({gameId: round.gameId, round: round.round}, { $set: setnewOption });
    console.log('added lie');
  },
  startGuessing: function(params){
    check(params.gameId, String);
    
    var game = Games.findOne({_id:params.gameId});
    var round = GameRounds.findOne({gameId:game._id,round: game.round});
    
    if(round.whenGuessingStarted){
      throw new Meteor.Error("already-started", "Guessing has already started.");
    }
    
    var whenTimeIsRunOut = new Date(round.whenRoundStarted.getTime() + Meteor.constants.GUESS_TIME_SECONDS *1000);
    var numberOfPlayers = _.size(game.players);
    var numberOfLies = _.size(round.options) - 1;
    if(new Date() < whenTimeIsRunOut && numberOfLies < numberOfPlayers ){
      throw new Meteor.Error("not-ready", "Can not start game until all players have lied or time has elapsed.");
    }
    
    //todo: should be using $min
    GameRounds.update({gameId: round.gameId, round: round.round}, { $set: {whenGuessingStarted: new Date()}}); 
  },
  addGuess: function(params){
    check(params.gameId, String);
    check(params.playerId, String);
    check(params.optionId, String);
    
    var game = Games.findOne({_id:params.gameId});
    var round = GameRounds.findOne({gameId:game._id,round: game.round});
    
    var setNewAnswer = {};
    setNewAnswer["answers." + params.playerId] =  params.optionId;
    GameRounds.update({gameId: round.gameId, round: round.round}, { $set: setNewAnswer });
  },
});

function getUnusedRoomCode(){
  var roomCode = generateRoomCode()
  while(Games.findOne({roomCode:roomCode}) != null){
    roomCode = generateRoomCode();
  }
  return roomCode;
}

function generateRoomCode(){
  return "xxxx".replace(/x/g, function() {return String.fromCharCode(getRandomInt(0, 26) + 'A'.charCodeAt(0));});
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}