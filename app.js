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

function enableTxt(elem) {
    var id = $(elem).attr("id");
    alert(id);
}

setTimeout(function(){},1000);

function nxtRound () {
  clickSeq = [];
  round++;
  displayCounter.innerHTML = round;
  sequence.push(colours[random()]);
  //displayRound ();
}

function random () {
  return Math.floor(Math.random()*4);
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

