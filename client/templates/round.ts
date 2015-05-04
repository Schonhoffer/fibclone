/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />

Template['round'].helpers({
  isGuessingStarted: function() {
    return !!(this.round && this.round.whenGuessingStarted);
  }
});