
var timeToWaitBeforeAllowingConnectionErrorMessage = 5000;

Meteor.startup(function () {
  setTimeout(function () {
    Session.set('allowConnectionErrorMessage', true);
  }, timeToWaitBeforeAllowingConnectionErrorMessage);
});

Template.layout.helpers({
  connected: function() {
    if (Session.get('allowConnectionErrorMessage')) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
});