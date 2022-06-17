Are you a music genius?

This is a trivia game that will test a player's knowledge of music. It will rely on data fetched from the Spotify API, and it will be an interactive expirience with varying levels of user input to determine what questions are being asked.


(Note, the following paragraph is how I would want a final, full APP to function. This is a large undertaking for one week, so for the purpose of this class, I will likely only implement the "parameter" in which the user can select an artist.)

After clicking the "find out" button on the greeting page, the user will be presented some options to set "parameters" for a 10 question quiz (note, they are not required to fill out any "parameters" they don't want to). Some ideas for the "parameters" a user can set are the genre of music they will quizzed on, a specific year in music, a decade of music, and/or the language of music. Alternatively, the user can select to be quizzed on one particular artist or album. 

Also on this page, the user can select the amount of people playing. Once all of these "parameters" are set, the fetch request will be sent to the Spotify API for the desired data. If there is sufficient data to build a full 10 question quiz with different questions for each player, the game will begin when the user presses start. If there is not enough data (given the user chosen "parameters"), the user will be instructed to broaden the scope of their game. (for example, there most likely isnt enough data about German gangster rap from 1973 to build a full, 10 question quiz, let alone multiple quizzes with different answers.)

Once the game starts, the user will be presented with 10 multiple choice questions. Some example quesionts are Whose album is this? (with a picture of the album provided), what album is this song from? (with the song title and potentially the artist provided), what artist is this? (this one will be tricky. Its easy to distinguish Beyonce from Bob Segar, so the best approach would be to list artists from the same genre, which even still has its shortcomings), what year was this song/album released?, how many songs are on this album?, how many features are on this album? (this is hard one), what album is this song from?

Once the player is done with their quiz, they will be informed of their results, and the next player will be prompted to beign their quiz. When all of the players are done, the final results will be displayed, along with a winning message for the winning player. A new game option will be presented, upon which the entire process starts over.

The techologies used will be HTML, CSS, vanilla JavaScript and the Spotify API (which is open to public use with 0auth2 authorization). Spotify provides a wide range of data with this API. Arrays will be assigned the requested data (determined by the user set "parameters") with JavaScipt, from which the quiz questions will be constructed via interpolation from these arrays. Starting the game is contingent upon there being enough data to construct 10 questions for all of the players. 
