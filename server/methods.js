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
      
    var roomId = Games.insert({
      createdAt: new Date(),
      allowGeo: params.allowGeo,
      hostId: params.hostId,
      roomCode: generateRoomCode(),
      round: 0,
      players: players
    });
    console.log('created new room: ' + roomId);
    return roomId;
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
    
    console.log('Adding player to game: ' + params.playerId, ', nickname: '+ params.nickname);
    var setNewPlayer = {};
    setNewPlayer["players." + params.playerId] =  {
      playerId: params.playerId,
      nickname: params.nickname
    };
    Games.update({_id: game._id}, { $set: setNewPlayer });
    
    return game._id;
  }
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