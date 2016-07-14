//Html elements
var startBtn = document.querySelector(".start"),
    strictBtn = document.querySelector(".strict"),
    pad = document.querySelector(".pad").children,
    displayCounter = document.querySelector(".displayCounter");

//variables that change
var round = 0,
    sequence = [],
    clickSeq = [],
    strict = false;

//Importing Audio files
const blueSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      yellowSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      redSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      greenSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

//variables that do not change
const timer = [1250,1000,750,500],
      sounds = [blueSnd,yellowSnd,redSnd,greenSnd],
      colours = ["blue", "yellow", "red",  "green"];


//When page loads
$(document).ready(function(){
  startBtn.addEventListener('click', reset);
  strictBtn.addEventListener('click', mode);

});

//starts the game or resets it back to the start
function reset () {
  startBtn.innerHTML = "Try Again?";
  round = 0;
  sequence = [];
  clickSeq = [];
  nxtRound();

  for (var i = 0; i < colours.length ; i++){
    pad[i].addEventListener('click', capture);
  }
}

//Adds what they user clicks to an array
function capture (evt) {
  clickSeq.push(evt.target.id);
  checkRound();
}


//When user has sucessfully completed a round
function nxtRound () {
  round++;
  clickSeq = [];
  level(round);
  displayCounter.innerHTML = "Round: " + round;
  sequence.push(colours[random()]);
  displayRound ();
}

// Chooses a random number between 0 - 3
function random () {
  return Math.floor(Math.random()*4);
}

//Shows the user the next sequence
function displayRound () {
  for(var i = 0 ; i<sequence.length; i++){
    for (var j = 0; j < pad.length ; j++){
      if(pad[j].id === sequence[i]){
        displayTimer($('#' + sequence[i]), i*level(round),j);
      }
    }
  }
}

//creates a set interval to flash the user the element in the sequence
function displayTimer(square, timer, soundNum) {
  setTimeout(function(){
    sounds[soundNum].play();
    square.addClass('flash');
  },timer);


  setTimeout(function(){
    square.removeClass('flash');
  },timer+500);
}

function checkRound () {
  for(var i = 0; i<clickSeq.length; i++) {
    if(sequence[i] !== clickSeq[i]) {
      //got it wrong, see if the user is playing on strict mode
      strictMode();
    }
  }
  //if the user sequence matches, then move to next round after a second
  if(clickSeq.length === sequence.length){
    setTimeout(function() {
      nxtRound()
    },1000);
  }
}

//as you go up in rounds, the timer to display the sequence decreases
function level (round) {
  if(round < 4){
    return timer[0];
  }
  if(round < 8) {
    return timer[1];
  }
  if(round < 12) {
    return timer[2];
  }
  return timer[3];
}

//Strict mode on/off
function mode (evt) {
  if(strict === true) {
    strict = false;
    strictBtn.innerHTML = "Strict Mode OFF";
  } else {
    strict = true;
    strictBtn.innerHTML = "Strict Mode ON";
  }
}

//Execute whether the user has clicked strict mode
function strictMode () {
  if(strict) {
    alert("Sorry that wasn't correct! Try again to see if you can beat your record");
    reset();
  } else {
    alert("Sorry that wasn't correct! Try round " + round + " again or click try again to start from the beginning");
    clickSeq = [];
    displayRound();
  }
}