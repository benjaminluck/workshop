var root = document.querySelector(':root');
var color_value = 0;
root.style.cssText = "--base-color-value: 255"; 

var frozen = false;

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

  if(!frozen){
    var color_value = x + y;
    root.style.cssText = "--base-color-value: "+color_value; 
  }
}

function freezeMotion(event) {
  console.log(arguments);
  frozen = !frozen;
  console.log(frozen);
}

window.addEventListener('deviceorientation', handleMotion);
window.addEventListener('mousemove', handleMotion);
window.addEventListener('click', freezeMotion); 
