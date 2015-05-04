/// <reference path=".meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />

interface Dictionary<T> {
  [index: string]: T;
} 

interface CreateRoomCommand {
    allowGeo: boolean;
    hostId: string;
    nickname: string;
}

interface JoinRoomCommand {
    roomCode: string;
    playerId: string;
    nickname: string;
}

interface SetRoundNumberCommand {
    gameId: string;
    roundNumber: number;
}

interface AddLieCommand {
    gameId: string;
    playerId: string;
    lie: string;
}

interface StartGuessingCommand {
    gameId : string
}

interface AddGuessCommand {
    gameId: string;
    playerId: string;
    optionId: string;
}

interface GamePlayer {
    playerId: string;
    nickname: string;
}

interface Round {
    
}

interface Game {
    _id?: string;
    allowGeo: boolean;
    hostId: string;
    roomCode: string;
    roundNumber: number;
    createdAt: Date;
    players: Dictionary<GamePlayer>,
    currentRound: Round
}
declare var Games : Mongo.Collection<Game>;

// interface ListDAO {
    // _id?: string;
    // name: string;
// }

// declare var Lists:Mongo.Collection<ListDAO>;

// createdAt: new Date(),
      // allowGeo: params.allowGeo,
      // hostId: params.hostId,
      // roomCode: generateRoomCode(),
      // roundNumber: 0,
      // players: players