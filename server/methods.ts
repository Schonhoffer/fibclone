/// <reference path="../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/underscore.d.ts" />
/// <reference path="../collections.d.ts"/>

Meteor.methods({
  createRoom: function (command : CreateRoomCommand) : string {
    check(command.allowGeo, Boolean);
    check(command.hostId, String);
    check(command.nickname, String);
    
    var players : Dictionary<GamePlayer> = {};
    players[command.hostId] = {
      playerId: command.hostId,
      nickname: command.nickname
    };

    var game : Game = {
        createdAt: new Date(),
        test: "feew",
        allowGeo: command.allowGeo,
        hostId: command.hostId,
        roomCode: generateRoomCode(),
        roundNumber: 0,
        players: players,
        currentRound: null
    };

    var gameId = Games.insert(game);

    console.log('created new room: ' + gameId);
    
    // GameRounds.insert({
      // round: 1,
      // gameId: gameId,
      // question: "What is the answer?",
      // options: {"truth": "42"},
      // answers: {},
      // truthValue: 1000,
      // lieValue: 500,
      // players: [params.hostId]
    // })
    
    return gameId;
  },
  
  joinRoom: function (command : JoinRoomCommand) : string {
    check(command.roomCode, String);
    check(command.playerId, String);
    check(command.nickname, String);
    
    function loadUnstartedGameByRoomCode(roomCode : string) : Game {
        console.log('Looking for room code: ' + roomCode);
        var game = Games.findOne({roomCode:roomCode});
        
        if(game == null){
          console.log('Could not find game with room code: ' + roomCode);
          throw new Meteor.Error("game-code-not-found", "Could not find a game for that game code.");
        }
        console.log('Found game with room code: ' + roomCode, ', gameId: '+ game._id);
        
        if(game.roundNumber != 0){
          console.log('Could not join game that has already started' + game._id);
          throw new Meteor.Error("game-already-started", "Can not join game that has already started.");
        }
        
        return game;
    }
    
    function addPlayerToGame(playerId : string, nickname : string) : void {
        console.log('Adding player to game: ' + playerId, ', nickname: '+ nickname);
        var player : GamePlayer = {
          playerId: playerId,
          nickname: nickname
        };
        var setNewPlayer = {};
        setNewPlayer["players." + playerId] =  player;
        Games.update({_id: game._id}, { $set: setNewPlayer });
        // GameRounds.update({gameId: game._id}, {$addToSet: {players: playerId}}, {multi:true});
    }
    
    var game = loadUnstartedGameByRoomCode(command.roomCode);
    
    addPlayerToGame(command.playerId, command.nickname);
    
    return game._id;
  },
  
  setRoundNumber: function(command : SetRoundNumberCommand) : void {
    check(command.roundNumber, Match.Integer);
    check(command.gameId, String);
    
    var game = getGameById(command.gameId);
    
    if(command.roundNumber -1 == game.roundNumber){
      Games.update({_id: game._id}, { $set: {roundNumber: command.roundNumber, roomCode: null}});
      //todo: should be using $min
      // GameRounds.update({gameId: game._id, round: params.round}, { $set: {whenRoundStarted: new Date()}}); 
    }
  },
  
  addLie: function(command : AddLieCommand){
    check(command.gameId, String);
    check(command.playerId, String);
    check(command.lie, String);
    
    var game = getGameById(command.gameId);
    // var round = GameRounds.findOne({gameId:game._id,roundNumber: game.roundNumber});
    
    var setnewOption = {};
    setnewOption["options." + command.playerId] =  command.lie;
    // GameRounds.update({gameId: round.gameId, round: round.roundNumber}, { $set: setnewOption });
    console.log('added lie');
  },
  
  startGuessing: function(command : StartGuessingCommand){
    check(command.gameId, String);
    
    var game = getGameById(command.gameId);
    // var round = GameRounds.findOne({gameId:game._id,round: game.roundNumber});
    
    if(round.whenGuessingStarted){
      throw new Meteor.Error("already-started", "Guessing has already started.");
    }
    
    var whenTimeIsRunOut = new Date(round.whenRoundStarted.getTime() + Meteor.settings['GUESS_TIME_SECONDS'] *1000);
    var numberOfPlayers = _.size(game.players);
    var numberOfLies = _.size(round.options) - 1;
    if(new Date() < whenTimeIsRunOut && numberOfLies < numberOfPlayers ){
      throw new Meteor.Error("not-ready", "Can not start game until all players have lied or time has elapsed.");
    }
    
    //todo: should be using $min for date started
    // GameRounds.update({gameId: round.gameId, round: round.roundNumber}, { $set: {whenGuessingStarted: new Date()}}); 
  },
  
  addGuess: function(command : AddGuessCommand){
    check(command.gameId, String);
    check(command.playerId, String);
    check(command.optionId, String);
    
    var game = getGameById(command.gameId);
    // var round = GameRounds.findOne({gameId:game._id,round: game.roundNumber});
    
    var setNewAnswer = {};
    setNewAnswer["answers." + command.playerId] =  command.optionId;
    // GameRounds.update({gameId: round.gameId, round: round.roundNumber}, { $set: setNewAnswer });
  },
});

function getGameById(gameId : string) : Game{
      console.log('Looking for room id: ' + gameId);
      var game = Games.findOne({_id: gameId});
      
      if(game == null){
        console.log('Could not find game with game id: ' + gameId);
        throw new Meteor.Error("game-not-found", "Could not find a game for that game id.");
      }
      
      return game;
    }

function getUnusedRoomCode() : string {
  var roomCode = generateRoomCode()
  while(Games.findOne({roomCode:roomCode}) != null){
    roomCode = generateRoomCode();
  }
  return roomCode;
}

function generateRoomCode() : string {
  return "xxxx".replace(/x/g, function() {return String.fromCharCode(getRandomInt(0, 26) + 'A'.charCodeAt(0));});
}

function getRandomInt(min, max) : number {
  return Math.floor(Math.random() * (max - min)) + min;
}