Router.route('/', {name: 'launchpad', template: 'launchpad'});
Router.route('/create', {name: 'create', template: 'create'});
Router.route('/join', {name: 'join', template: 'join'});
Router.route('/lobby/:_id', { 
  name: 'lobby', 
  template: 'lobby',
  data: function () { 
    return Games.findOne({_id: this.params._id}) }
  });