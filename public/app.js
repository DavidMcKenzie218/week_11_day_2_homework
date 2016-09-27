var idle = function(container, coordinates){
  var map =new Map(container, coordinates, 10);
  map.addMarker(coordinates);
  map.addClickEvent();
}

var newGame = function(container){
  var newYork = {lat: 40.712784, lng: -74.005941};
  var map = new Map(container, newYork, 10);
  map.addClickEvent();
}

var createButton = function(){
  var button = document.createElement("button");
  button.innerText = "Play Game";
  return button;
}

var addButtonToPage = function(button){
  document.body.appendChild(button);
}

var initilize = function(){
  var container = document.querySelector("#map");
  var onStart =  { lat: 55.94716, lng: -3.20198}; 
 
  idle(container, onStart);
  var button = createButton();
  addButtonToPage(button);
  button.onclick = console.log("pressed");
}

window.onload = initilize;