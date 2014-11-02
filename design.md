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

##game flow
 1. from root player can either create or join
  - from create
   1. creates game on server
   2. generates room code and player uuid
   3. shows host the room code
  - from join
   1. Enter nickname and room code
   2. Gets new player uuid
 2. everyone sees players as they join
 3. host starts the game, are questions picked?, Round = 1
 4. 

## Questions
 - When are scores computed?
 - Should there be a 'Host'?
 - Min/Max players?
 - Lots of docs or few docs?
 - How do finished games get cleaned up?
 - 
 

