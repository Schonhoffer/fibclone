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
    return [Meteor.subscribe('games', Session.get('playerId')),
            Meteor.subscribe('gameRounds', this.params._id)]
  },
  data: function () { 
    var gameId = this.params._id;
    var round = 0;
    check(gameId, String);

    var game = Games.findOne({_id: gameId});
    if(game){
      round = game.round;
    }
    
    return {
      game: game,
      round: GameRounds.findOne({gameId: gameId, round: {$lte: round}})
    }
  }
});