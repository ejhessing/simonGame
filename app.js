var displayCounter = document.querySelector(".displayCounter");
var startBtn = document.querySelector(".start");
var pad = document.querySelector(".pad").children;

let round = 0;
let sequence = [];
var colours = ["blue", "yellow", "red",  "green"];
var timer = [1000,800,650,450];
var timerCounter = 0;
var clickSeq = [];



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
  displayCounter.innerHTML = round;
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
        displayTimer($('#' + sequence[i]), i*level(round));
      }
    }
  }
}

function displayTimer(square, timer) {
  setTimeout(function(){
    square.addClass('clicked');
  },timer);


  setTimeout(function(){
    square.removeClass('clicked');
  },timer+500);
}

function checkRound () {
  for(var i = 0; i<clickSeq.length; i++) {
    if(sequence[i] !== clickSeq[i]) {
      console.log("Sorry wrong button!");
    }
  }
  if(clickSeq.length === sequence.length){
    nxtRound();
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
