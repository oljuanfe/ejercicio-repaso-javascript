'use strict';

console.log('>> Ready :)');

var button = document.querySelector('.start-button');
var inputRadio = document.querySelectorAll('.radio');

var jsonResponse;
var urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/4.json';

function handleInputChange() {
  urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/'+ event.target.value +'.json';
}

function handleClick (){
  console.log('estoy clickando');
  event.preventDefault();
  askForCards();
}

function askForCards (){
  fetch(urlForFetch)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      jsonResponse = json;
      console.log('varjson',jsonResponse);
    });
}


button.addEventListener('click', handleClick);

for (var i = 0; i < inputRadio.length; i++){
  inputRadio[i].addEventListener('click', handleInputChange);
}