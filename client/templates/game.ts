/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />

Template['game'].helpers({
  notStarted: function() {
    return this.roundNumber == 0;
  }
});