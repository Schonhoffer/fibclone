/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/meteor.d.ts" />
/// <reference path="../../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions/ironrouter.d.ts" />

/// <reference path="../../collections.d.ts"/>

var timeToWaitBeforeAllowingConnectionErrorMessage = 5000;

Meteor.startup(function () {
  setTimeout(function () {
    Session.set('allowConnectionErrorMessage', true);
  }, timeToWaitBeforeAllowingConnectionErrorMessage);
});

Template['layout'].helpers({
  connected: function() {
    if (Session.get('allowConnectionErrorMessage')) {
      return Meteor.status()['connected'];
    } else {
      return true;
    }
  }
});