Router.route('/', {name: 'launchpad', template: 'launchpad'});
Router.route('/create', {name: 'create', template: 'create'});
Router.route('/join', {name: 'join', template: 'join'});
Router.route('/game/:_id', { 
  name: 'game', 
  template: 'game',
  data: function () { 
    return Games.findOne({_id: this.params._id}) }
  });