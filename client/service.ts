/// <reference path="../collections.d.ts"/>

interface MethodCallback<T> {
  (error: any, result: T): void;
}

class FibcloneServiceClient
{
	createRoom (command : CreateRoomCommand, callback: MethodCallback<string>) : void 
	{
		Meteor.call('createRoom', command, callback);
    }
	
	joinRoom (command : JoinRoomCommand, callback: MethodCallback<string>) : void 
	{
		Meteor.call('createRoom', command, callback);
	}
	setRoundNumber (command : SetRoundNumberCommand, callback: MethodCallback<void>) : void 
	{
		Meteor.call('createRoom', command, callback);
	}
	addLie (command : AddLieCommand, callback: MethodCallback<void>) : void
	{
		Meteor.call('createRoom', command, callback);
	}
	addGuess (command : AddGuessCommand, callback: MethodCallback<void>) : void
	{
		Meteor.call('createRoom', command, callback);
	}
}