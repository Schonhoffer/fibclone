Template.lie.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var params = {
     gameId: this.game._id,
     lie: template.$('[name=lie]').val(),
     playerId: Session.get('playerId')
    };
    
    Meteor.call('addLie', params, function (error, result) {
      if (error) {
        if (error.error === "lie-is-the-truth") {
          alert('That lie is the truth');
        }
        else{
          alert('couldn\'t submit lie');
        }
        
      } else {
        //tell them it's been submitted, show waht the put, show a timer?
      }
    });
  }
});