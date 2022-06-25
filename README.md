Music Quiz

This is a trivia game that will test a player's knowledge of music. It will rely on data fetched from the LastFM API, and it will be an interactive expirience with user input to determine what questions are being asked.

After filling out the artist input and clicking the "find out artist" button on the greeting page, the user is quizzed about album artwork. It is the users task to match the correct album artwork to the title in the question, and there are five questions.

After filling out the genre input and clicking the "find out genre" button on the greeting page, the user is quizzed about albums from their inputted genre. It is the users task to match the correct album title to the artwork displayed in the question, and there are five questions.

Once the player is done with their quiz, they will be informed of their results, and the next player will be prompted to start over. A new game option will be presented, upon which the entire process starts over.

The techologies used will be HTML, CSS, vanilla JavaScript and the LastFM API. LastFM provides a wide range of data with this API. Arrays will be assigned the requested data (determined by the user's input) with JavaScipt, from which the quiz questions will be constructed via interpolation from these arrays. Starting the game is contingent upon there being enough data to construct 5 questions for all of the quizzes.

//b6d97def09e924303dab1c829302163b
//0475e4b7b017bd6c657020d0458d38ac