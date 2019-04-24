var root = document.querySelector(':root');
var tileMap = [];

var baseColor = tinycolor.random();
var baseColorString = baseColor.toHexString();

var characterMap = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var charColorMap = baseColor.analogous(characterMap.length);
var colorStepValue = (360 - -360) / characterMap.length;

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function randomRGBValue(){ 
  var R = (Math.floor(Math.random() * 255));
  var G = (Math.floor(Math.random() * 255)); 
  var B = (Math.floor(Math.random() * 255));

  return[R,G,B];
}

function LimitNumberTo(x, max){
  return (x > max) ? max : x
}

var root = document.querySelector(':root');
var color_value = 0;

var solid_1 = randomRGBValue();
var solid_2 = randomRGBValue();
var mixed_color = [
  LimitNumberTo(solid_1[0] + solid_2[0],255),
  LimitNumberTo(solid_1[1] + solid_2[1],255),
  LimitNumberTo(solid_1[2] + solid_2[2],255)
];

root.style.cssText = "--random-color-1: rgba("+solid_1.join(',')+", 1)"; 
root.style.cssText += "--random-color-2: rgba("+solid_2.join(',')+", 1)";  

var initalCss  = root.style.cssText;

ready(function(){ 
  var selectedRect = document.querySelector('.rectangle');


  var textHoldElem = document.querySelector('.textHold');
  textHoldElem.addEventListener('keydown', handleTextInput);
  console.log(textHoldElem);
}); 


function handleMotion(e) { 
  var elem = document.querySelector('.rectangle.selected');
  if(typeof(elem) != 'undefined' && elem){
    elem.style.transform = "rotateZ(" + - ( e.alpha - 180 ) + "deg) "; 
  }
}



function handleTextInput(event){
  buildTileMapByCharacters();
  paintTileMap();

}

function buildTileMapByCharacters(){
  var textHoldElem = document.querySelector('.textHold');
  var characters = textHoldElem.value.split("");
  tileMap = [];
  for(var i = 0; i < characters.length; i++){
    var tileColor = tinycolor(baseColorString); 
    tileColorIndex = characterMap.findIndex(function(x) { return x == characters[i]});
    switch(characters[i]){
      case ' ':
        tileColor = tinycolor('white');
      break;
      default:
        if(tileColorIndex){
          if(typeof(charColorMap[tileColorIndex] != 'undefined')){
            tileColor = charColorMap[tileColorIndex];
          }
        }
      break;
  }
    tileMap[i] = {'char': characters[i], 'color': tileColor.toHexString()};
  }

}

function paintTileMap(){
  var canvas = document.querySelector('.canvas');
  canvas.innerHTML = ``;
  for(var i = 0; i < tileMap.length; i++){ 
    canvas.innerHTML += `<div class="rectangle" style="background-color: ${tileMap[i].color};" >${tileMap[i].char}</div>`;

  }
}


window.addEventListener('deviceorientation', handleMotion);
window.addEventListener('mousemove', handleMotion);


