var root = document.querySelector(':root');
var color_value = 0;
var frozen = false;

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
  var background_color = randomRGBValue(); 
  var rectangle_color = randomRGBValue(); 
  root.style.cssText += "--background-color: rgba("+background_color.join(',')+", 1)";  
  root.style.cssText += "--rectangle-color: rgba("+rectangle_color.join(',')+", 1)";  
  initalCss = root.style.cssText;

  $('.rectangle').draggable();
}); 

function freezeMotion(event) { 
  frozen = !frozen; 
}

window.addEventListener('deviceorientation', handleMotion);
window.addEventListener('mousemove', handleMotion);
window.addEventListener('click', freezeMotion);  
window.addEventListener('touchstart', freezeMotion); 


 