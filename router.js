Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'launchpad', template: 'launchpad', layoutTemplate: null});
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
    var game = Games.findOne({_id: this.params._id});
    
    var round = null;
    if(game){
      round = GameRounds.findOne({gameId: this.params._id, round: game.round})
    }
    
    return {
      game: game,
      round: round
    }
  }
});