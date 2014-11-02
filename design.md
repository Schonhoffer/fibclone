## models

**Game**
 - id
 - timeCreated
 - state
 - step
 - timeStepAdvanced
 - Players
 - Score


## routes

## methods
createGame
makeVote
advanceGame - idempotent

#game flow
 1. from root player can either create or join
  - from create
   1. creates game on server
   2. shows host the code
  - from host
   1. 

## Questions
 - When are scores computed?
 - Should there be a 'Host'?
 - Min/Max players?
 - Lots of docs or few docs?
 - How do finished games get cleaned up?
 - 
 

