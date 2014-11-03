function generateUUID(){
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g,function(a,b){return b=Math.random()*16,(a=="y"?b&3|8:b|0).toString(16)});
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    var uuid = Session.get('playerId');
    
    if(!uuid){
      uuid = generateUUID();
      Session.setPersistent('playerId', uuid);
    }
    
    console.log('playerId is '+uuid);
  });
}