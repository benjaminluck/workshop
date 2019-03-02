var root = document.querySelector(':root');
var color_value = 0;

var colorManipulable = {
  "red": false,
  "green": false,
  "blue": false,
}

var colorValues = {
  "red": 255,
  "green": 255,
  "blue": 255
}

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};

function handleMotion(event) { 
  var max = 255;
  var min = 0;

  if(typeof(event.clientY) != 'undefined'){ 
    var y = (event.clientY / window.innerHeight) * max; 
  }

  for(colorName in colorManipulable){
    if(colorManipulable[colorName]){
      var color_value = y;
      colorValues[colorName] = color_value;
      var colorHex = rgbToHex(parseInt(colorValues[colorName]));
      var colorBar = document.querySelector('.bar.'+colorName+' .code');

      switch(colorName){
        case 'red':
          colorHex = '#'+colorHex+'00'+'00';
        break;
        case 'green':
          colorHex = '#'+'00'+colorHex+'00';
        break;
        case 'blue':
          colorHex = '#'+'00'+'00'+colorHex;
        break;
      }

      console.log(colorBar);
      colorBar.innerHTML = colorHex;
      console.log('colorName' + fullColorHex(parseInt(colorValues[colorName]),0,0)); 
    };
  }

  var cssText = '';
  for(colorName in colorManipulable){
    cssText += "--color-"+colorName+"-value: "+colorValues[colorName]+";";
  }
  console.log(cssText);
  root.style.cssText = cssText;
}

function toggleManipulation(colorName) { 
  if(typeof colorManipulable[colorName] != 'undefined'){
    colorManipulable[colorName] = !colorManipulable[colorName];
  }
}

function handleTouchClick(event){
  var element = event.target; 
  console.log(colorManipulable);
  if(element.classList.contains('bar')){
    if(element.classList.contains('red')){
      toggleManipulation('red');
    }
    if(element.classList.contains('green')){
      toggleManipulation('green');
    }
    if(element.classList.contains('blue')){
      toggleManipulation('blue');
    }
  }
}

window.addEventListener('deviceorientation', handleMotion);
window.addEventListener('mousemove', handleMotion);
window.addEventListener('click', handleTouchClick); 
window.addEventListener('touchstart', handleTouchClick); 
