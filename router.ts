/// <reference path=".meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path=".meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />
/// <reference path="collections.d.ts" />

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'launchpad', template: 'launchpad'});
Router.route('/create', {name: 'create', template: 'create'});
Router.route('/join', {name: 'join', template: 'join'});
Router.route('/game/:_id', { 
  name: 'game', 
  template: 'game',
  waitOn: function() {
    return [Meteor.subscribe('games', Session.get('playerId'))]
  },
  data: function () { 
    var gameId : string = this.params._id;
    var roundNumber = 0;
    check(gameId, String);

    var game : Game = Games.findOne({_id: gameId});
    if(game){
      roundNumber = game.roundNumber;
    }
    
    return {
      game: game,
      round: game.currentRound,
      roundNumber: roundNumber
    }
  }
});