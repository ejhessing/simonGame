var displayCounter = document.querySelector(".displayCounter");
var startBtn = document.querySelector(".start");
var pad = document.querySelector(".pad").children;

var round = 0;
var sequence = [];
var colours = ["blue", "yellow", "red",  "green"];
var timer = [1250,1000,750,500];
var timerCounter = 0;
var clickSeq = [];
var blueSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var yellowSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var redSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var greenSnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var sounds = [blueSnd,yellowSnd,redSnd,greenSnd];

$(document).ready(function(){
  startBtn.addEventListener('click', reset);
});

function reset () {
  for (var i = 0; i < colours.length ; i++){
    pad[i].addEventListener('click', capture);
  }
  round = 0;
  sequence = [];
  timerCounter = 0;
  clickSeq = [];
  nxtRound();
}

function capture (evt) {
  let clicked = evt.target.id;;
  clickSeq.push(clicked);
  checkRound();
}



function nxtRound () {
  clickSeq = [];
  round++;
  level(round);
  displayCounter.innerHTML = "Round: " + round;
  sequence.push(colours[random()]);
  console.log(sequence)
  displayRound ();
}

function random () {
  return Math.floor(Math.random()*4);
}

function displayRound () {
  for(var i = 0 ; i<sequence.length; i++){
    for (var j = 0; j < pad.length ; j++){
      if(pad[j].id === sequence[i]){
        displayTimer($('#' + sequence[i]), i*level(round),j);
      }
    }
  }
}

function displayTimer(square, timer, soundNum) {
  setTimeout(function(){
    sounds[soundNum].play();
    square.addClass('clicked');
  },timer);


  setTimeout(function(){
    square.removeClass('clicked');
  },timer+500);
}

function checkRound () {
  for(var i = 0; i<clickSeq.length; i++) {
    if(sequence[i] !== clickSeq[i]) {
      alert("Sorry wrong button!");
      //just refreshes the page giving the user the ability to start again
      window.location.reload();
    }
  }
  if(clickSeq.length === sequence.length){
    setTimeout(function() {
      console.log("Next Round");
      nxtRound()
    },1000);
  }
}

function level (round) {
  //as you go up in rounds, the timer to display the sequence decreases
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
