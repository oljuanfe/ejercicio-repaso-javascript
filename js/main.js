'use strict';

console.log('>> Ready :)');

var button = document.querySelector('.start-button');

var jsonResponse;

function handleClick (){
  console.log('estoy clickando');
  event.preventDefault();
  askForCards();
}

function askForCards (){
  fetch('https://raw.githubusercontent.com/Adalab/cards-data/master/4.json')
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log('json',json);
      jsonResponse = json;
      console.log('varjson',jsonResponse);
    });
}
console.log('varjson',jsonResponse);

button.addEventListener('click', handleClick);
