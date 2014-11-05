Template.round.helpers({
  isGuessingStarted: function() {
    return !!(this.round && this.round.whenGuessingStarted);
  }
});