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

function handleMotion(event) { 
  var max = 255; 
  var min = 0;

  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  if(typeof(event.screenX) != 'undefined'){
    var x = event.screenX * (max / window.innerWidth); 
  }

  if(typeof(event.screenY) != 'undefined'){ 
    var y = event.screenY * (max / window.innerHeight); 
  }

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of  
  // x and y to [0,180]
  x += 90;
  y += 90;


  var guessRGB = [x,y,x];
  
  if(!frozen){
    root.style.cssText = initalCss;
    root.style.cssText += "--mixture-color: rgba("+guessRGB.join(',')+", 1)";   
  }
}

function applyMixtureColor(){
  root.style.cssText = initalCss;
  root.style.cssText += "--mixture-color: rgba("+mixed_color.join(',')+", 1)";   
}

ready(function(){
  var elemHover = document.querySelector('.mixture');
  elemHover.addEventListener('mousemove', function(event){
    applyMixtureColor();  
  }); 
}); 

function freezeMotion(event) { 
  frozen = !frozen; 
}

window.addEventListener('deviceorientation', handleMotion);
window.addEventListener('mousemove', handleMotion);
window.addEventListener('click', freezeMotion); 
window.addEventListener('touchstart', freezeMotion); 


