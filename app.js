var displayCounter = document.querySelector(".displayCounter");
var pad = document.querySelector(".pad").children;

let round = 0;
let sequence = [];
var colours = ["red", "blue", "green", "yellow"];
var timer = [1000,750,500,400];
var clickSeq = [];



$(document).ready(function(){

  for (var i = 0; i < pad.length ; i++){
    pad[i].addEventListener('click', capture);
  }
  nxtRound();

});


function capture (evt) {
  let clicked = evt.target.id;;
  clickSeq.push(clicked);
  checkRound();
}



setTimeout(function(){},1000);

function nxtRound () {
  clickSeq = [];
  round++;
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
        var square = $('#' + sequence[i]);
        displayTimer(square, i*1000);
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
      return console.log("Wrong");
    }
  }
  if(clickSeq.length === sequence.length){
    nxtRound();
  }
}

