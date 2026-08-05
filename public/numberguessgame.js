let Minimum_Num = Number(document.getElementById("min_num").value);
let Maximum_Num = Number(document.getElementById("max_num").value);
let attempts = 0;
let randomNumber;
let input_num = Number(document.getElementById("guess").value);
let mode;
let bestScore = 0;
let scrn_bestScore_disp = 0;
let new_best_score_disp;
let currentBestScore = 0;

///   Change of Difficulty Mode
function changeMode() {
  mode = document.getElementById("gameMode").value;
  //  For 3 Level Difficulty Mode
  if (mode === "diff_level_select") {
    document.getElementById("difficultySection").style.display = "block";
    document.getElementById("customSection").style.display = "none";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("diff_3").disabled = false;
    document.getElementById("playAgainBtn").disabled = true;
    document.getElementById("gameMode").disabled = false;
    attempts = 0;
    diff_3.value = "default";
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("guess").value = "";
    document.getElementById("result").textContent = "";
    randomNumber = 0;
    Minimum_Num = 0;
    Maximum_Num = 0;

    // For Custom Mode
  } else if (mode === "custom") {
    document.getElementById("difficultySection").style.display = "none";
    document.getElementById("customSection").style.display = "block";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("playAgainBtn").disabled = true;
    document.getElementById("gameMode").disabled = false;
    attempts = 0;

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("guess").value = "";
    document.getElementById("result").textContent = "";
    randomNumber = 0;
    Minimum_Num = 0;
    Maximum_Num = 0;
  }
}
///  Start Game Function
function start() {
  mode = document.getElementById("gameMode").value;
  let difficulty = document.getElementById("diff_3").value;
  let startSoundShouldPlay = false;
  // ON Start Button Click Disable Start,Play Again Button and Enable Guess Button If Any Mode Is Selected   ;
  document.getElementById("guessBtn").disabled = false;
  document.getElementById("playAgainBtn").disabled = true;

  // For Mode Difficulty

  if (mode == "diff_level_select") {
    document.getElementById("guessBtn").disabled = false;

    if (difficulty === "easy") {
      Minimum_Num = 1;
      Maximum_Num = 10;

      // Buttons Disable/Enable

      document.getElementById("startBtn").disabled = true;
      document.getElementById("diff_3").disabled = true;
      document.getElementById("gameMode").disabled = true;

      //Reset Attempts if previously played diiferent mode , and Generates Random Number ;

      attempts = 0;
      randomNumber =
        Math.floor(Math.random() * (Maximum_Num - Minimum_Num + 1)) +
        Minimum_Num;

      // Store Random Number In Local Storage And Reset Attempts, Guess Input and Result Text Content ;

      localStorage.setItem("randomNumber", randomNumber);
      document.getElementById("attempts").textContent = attempts;
      document.getElementById("guess").value = "";
      document.getElementById("result").textContent = "";

      console.log(randomNumber);
      startSoundShouldPlay = true;
    } else if (difficulty === "medium") {
      Minimum_Num = 1;
      Maximum_Num = 50;

      // Buttons Disable/Enable

      document.getElementById("startBtn").disabled = true;
      document.getElementById("diff_3").disabled = true;
      document.getElementById("gameMode").disabled = true;

      //Reset Attempts if previously played diiferent mode , and Generates Random Number ;

      attempts = 0;
      randomNumber =
        Math.floor(Math.random() * (Maximum_Num - Minimum_Num + 1)) +
        Minimum_Num;

      // Store Random Number In Local Storage And Reset Attempts, Guess Input and Result Text Content ;

      localStorage.setItem("randomNumber", randomNumber);
      document.getElementById("attempts").textContent = attempts;
      document.getElementById("guess").value = "";
      document.getElementById("result").textContent = "";
      console.log(randomNumber);
      startSoundShouldPlay = true;
    } else if (difficulty === "hard") {
      Minimum_Num = 1;
      Maximum_Num = 100;

      // Buttons Disable/Enable

      document.getElementById("startBtn").disabled = true;
      document.getElementById("diff_3").disabled = true;
      document.getElementById("gameMode").disabled = true;

      //Reset Attempts if previously played diiferent mode , and Generates Random Number ;

      attempts = 0;
      randomNumber =
        Math.floor(Math.random() * (Maximum_Num - Minimum_Num + 1)) +
        Minimum_Num;

      // Store Random Number In Local Storage And Reset Attempts, Guess Input and Result Text Content ;

      localStorage.setItem("randomNumber", randomNumber);
      document.getElementById("attempts").textContent = attempts;
      document.getElementById("guess").value = "";
      document.getElementById("result").textContent = "";
      console.log(randomNumber);
      startSoundShouldPlay = true;
    } else {
      // If No Difficulty Level Is Selected , Shows A Message

      document.getElementById("result").textContent =
        "Select A Difficulty Level";

      // And Disable Guess ,Start Button And Enable Difficulty Level Selection And Game Mode Selection ;

      document.getElementById("guessBtn").disabled = true;
      document.getElementById("diff_3").disabled = false;
      document.getElementById("gameMode").disabled = false;
    }
  }
  // For CUSTOM MODE
  else {
    Minimum_Num = Number(document.getElementById("min_num").value);
    Maximum_Num = Number(document.getElementById("max_num").value);
    attempts = 0;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("guess").value = "";
    document.getElementById("result").textContent = "";
    //Checks For Empty Input  For Input Fields In Minimum And Maximum Number
    if (Minimum_Num == "" || Maximum_Num == "") {
      document.getElementById("result").textContent = "Enter A Number";
      document.getElementById("guessBtn").disabled = true;
    }
    //Negative Number
    else if (Minimum_Num < 0 || Maximum_Num < 0) {
      document.getElementById("result").textContent =
        "Don't Enter A Negative Number";
      document.getElementById("guessBtn").disabled = true;
    }
    // Same Number                                                      // Shows A Message Accordingly And Keep Buttons Disable //
    else if (Minimum_Num == Maximum_Num) {
      document.getElementById("result").textContent =
        "Both Number Should Not Be Same ";
      document.getElementById("guessBtn").disabled = true;
    } // If Minimum Number Is Greater Than Maximum Number
    else if (Minimum_Num > Maximum_Num) {
      document.getElementById("result").textContent =
        " Maximum Number Should Be Greater Than Minimum Number";
      document.getElementById("guessBtn").disabled = true;
    } // If All Conditions Are Satisfied ,
    else {
      document.getElementById("result").textContent = "";
      // Enables Guess Button And Disables Start Button And Game Mode Selection Until The Game Is Over ;
      document.getElementById("startBtn").disabled = true;
      document.getElementById("gameMode").disabled = true;

      //And Generates Random Number Between Minimum And Maximum Number ;

      randomNumber =
        Math.floor(Math.random() * (Maximum_Num - Minimum_Num + 1)) +
        Minimum_Num;
      localStorage.setItem("randomNumber", randomNumber);
      console.log(randomNumber);
      startSoundShouldPlay = true;
    }
  }
  if (soundEnabled && startSoundShouldPlay) {
    startsound.currentTime = 0;

    startsound.onended = () => {
      if (soundEnabled) {
        gameloop.currentTime = 0;
        gameloop.play();
      }
    };

    startsound.play();
  }
}

///  Guess Function
function guess() {
  let guess_value = document.getElementById("guess").value;

  // Checks For Empty Input
  if (guess_value == "") {
    document.getElementById("result").textContent = "Please Enter A  Number!!";

    //  Negative Number
  } else if (guess_value <= -1) {
    document.getElementById("result").textContent =
      "Don't Enter A Negative Number";
  } else {
    // Converts The Input Value To Number And Also Get The Random Number From Local Storage And Converts It To Number ;
    input_num = Number(guess_value);
    let rmd_num = Number(localStorage.getItem("randomNumber"));
    // Validates If The Input Number Is Within The Minimum And Maximum Range , If Not Shows A Message Accordingly ;
    if (input_num < Minimum_Num || input_num > Maximum_Num) {
      document.getElementById("result").textContent =
        `Enter A Number Between ${Minimum_Num} & ${Maximum_Num}`;
    } // If the input number is within the range ,and the result is checked against the ramdom number
    else {
      // attempts are incremented
      attempts++;

      document.getElementById("attempts").textContent = attempts;
      // For Guess greater than the random number
      if (input_num > rmd_num) {
        document.getElementById("result").textContent =
          `Too High!! Try Again!!`;
        if (soundEnabled) {
          guesssound.currentTime = 0;
          guesssound.play();
        }
      } // For Guess lesser than the random number
      else if (input_num < rmd_num) {
        document.getElementById("result").textContent = `Too Low!! Try Again!!`;
        if (soundEnabled) {
          guesssound.currentTime = 0;
          guesssound.play();
        }
      } // For Guess equal to the random number
      else {
        document.getElementById("result").textContent =
          `You Have Guessed The Number ${rmd_num}  Right 🎉 In ${attempts} attempts`;
        BestScore();

        //Enables play again difficulty selection and game mode slection and disables guess button ;
        document.getElementById("playAgainBtn").disabled = false;
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("diff_3").disabled = false;
        document.getElementById("startBtn").disabled = false;
        document.getElementById("gameMode").disabled = false;
        gameloop.pause();
        gameloop.currentTime = 0;

        if (soundEnabled) {
          correctguessSound.currentTime = 0;
          correctguessSound.play();
        }
      }
    }
  }
}

/// Play Again Function

function playagain() {
  // Resets The Random Number And Generate Another And Set That In Local Storage
  randomNumber =
    Math.floor(Math.random() * (Maximum_Num - Minimum_Num + 1)) + Minimum_Num;
  localStorage.setItem("randomNumber", randomNumber);
  //, Attempts are reset to 0
  attempts = 0;
  document.getElementById("attempts").textContent = attempts;
  // Resets Guess Input And Result Text Content And Disables Play Again Button ,Start Button , Difficulty Section And Game Mode Slection  Enables Guess Button ;
  document.getElementById("guess").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("playAgainBtn").disabled = true;
  document.getElementById("guessBtn").disabled = false;
  document.getElementById("startBtn").disabled = true;
  document.getElementById("diff_3").disabled = true;
  document.getElementById("gameMode").disabled = true;
  console.log(randomNumber);
  setTimeout(() => {
    if (soundEnabled) {
      gameloop.currentTime = 0;
      gameloop.play();
    }
  }, 200);
}

//  Best Score Feature Function

// }
function BestScore() {
  // Update Current Best only if this game is better
  if (attempts > currentBestScore) {
    currentBestScore = attempts;
  }

  // Display Current Best
  document.getElementById("currentBestScore_disp").textContent =
    currentBestScore;

  // Get All-Time Best from localStorage
  let savedBestScore = localStorage.getItem("bestScore_Set");

  // No previous All-Time Best
  if (savedBestScore === null) {
    localStorage.setItem("bestScore_Set", attempts);

    document.getElementById("allTimeBestScore_disp").textContent = attempts;

    return;
  }

  let allTimeBestScore = Number(savedBestScore);

  // Update All-Time Best only when surpassed
  if (attempts > allTimeBestScore) {
    localStorage.setItem("bestScore_Set", attempts);

    allTimeBestScore = attempts;
  }

  // Display All-Time Best
  document.getElementById("allTimeBestScore_disp").textContent =
    allTimeBestScore;
}
//  For Displaying Best Score ON Page Load
function displayAllTimeBestScore() {
  let savedBestScore = localStorage.getItem("bestScore_Set");

  if (savedBestScore === null) {
    document.getElementById("allTimeBestScore_disp").textContent = "0";
  } else {
    document.getElementById("allTimeBestScore_disp").textContent =
      savedBestScore;
  }
}

// =========================================
// HOW TO PLAY DIALOG
// =========================================

function openHowToPlay() {
  const dialog = document.getElementById("howToPlayDialog");

  dialog.classList.add("active");
  dialog.setAttribute("aria-hidden", "false");
}

function closeHowToPlay() {
  const dialog = document.getElementById("howToPlayDialog");

  dialog.classList.remove("active");
  dialog.setAttribute("aria-hidden", "true");
}

// =========================================
// GAME FEATURES DIALOG
// =========================================

function openGameFeatures() {
  const dialog = document.getElementById("gameFeaturesDialog");

  dialog.classList.add("active");
  dialog.setAttribute("aria-hidden", "false");
}

function closeGameFeatures() {
  const dialog = document.getElementById("gameFeaturesDialog");

  dialog.classList.remove("active");
  dialog.setAttribute("aria-hidden", "true");
}
// Close dialog when clicking outside the box

document.querySelectorAll(".dialog-overlay").forEach(function (overlay) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
    }
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document
      .querySelectorAll(".dialog-overlay.active")
      .forEach(function (dialog) {
        dialog.classList.remove("active");
        dialog.setAttribute("aria-hidden", "true");
      });
  }
});
displayAllTimeBestScore();

//Sound Feature
let soundEnabled = true;
const startsound = new Audio("sounds/start.mp3");
startsound.volume = 0.9;
const guesssound = new Audio("sounds/guess.mp3");
guesssound.volume = 0.9;
const gameloop = new Audio("sounds/game-loop.mp3");
gameloop.loop = true;
gameloop.volume = 0.22;

const correctguessSound = new Audio("sounds/correctguess.mp3");
correctguessSound.volume = 0.45;
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("soundEnabled", soundEnabled);

  const soundButton = document.getElementById("soundToggleBtn");
  if (soundEnabled) {
    soundButton.textContent = "🔊 Sound On";
  } else {
    soundButton.textContent = "🔇 Sound Off";

    // Stop all audio immediately
    startsound.pause();
    startsound.currentTime = 0;
    guesssound.pause();
    guesssound.currentTime = 0;
    gameloop.pause();
    gameloop.currentTime = 0;
    correctguessSound.pause();
    correctguessSound.currentTime = 0;

    // Prevent the start sound from restarting the loop
    startsound.onended = null;
  }
}

/// Load saved preference for sound on page load ;;
let savedSoundSetting = localStorage.getItem("soundEnabled");
if (savedSoundSetting === null) {
  soundEnabled = true;
} else {
  soundEnabled = savedSoundSetting === "true";
}
const soundButton = document.getElementById("soundToggleBtn");
if (soundEnabled) {
  soundButton.textContent = "🔊 Sound On";
} else {
  soundButton.textContent = "🔇 Sound Off";
  // Stop all audio immediately
  startsound.pause();
  startsound.currentTime = 0;
  guesssound.pause();
  guesssound.currentTime = 0;
  gameloop.pause();
  gameloop.currentTime = 0;
  correctguessSound.pause();
  correctguessSound.currentTime = 0;

  // Prevent the start sound from restarting the loop
  startsound.onended = null;
}
