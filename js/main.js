'use strict';

var button = document.querySelector('.start-button');
var inputRadio = document.querySelectorAll('.radio');
var cardList = document.querySelector('.cardList');

var jsonResponse;
var urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/4.json';

function handleInputChange() {
  urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/'+ event.target.value +'.json';
}



function askForCards (){
  fetch(urlForFetch)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      jsonResponse = json;
      console.log('varjson',jsonResponse);
      console.log('longitud',jsonResponse.length);
      createListOfCards();
    });
}

function createListOfCards() {
  console.log('longitud',jsonResponse.length);
  cardList.innerHTML = null;
  jsonResponse.map(function(card){
    
    var imgCardUrl = card.image;
    var newCardItem = document.createElement('li');
    var newCardImageFront = document.createElement('img');
    var newCardImageBack = document.createElement('img');

    newCardItem.setAttribute('class','card-item');

    
    newCardImageFront.setAttribute('src',imgCardUrl);
    newCardImageFront.setAttribute('class','card-img-front');
    newCardImageFront.setAttribute('alt','pokemon');

    
    newCardImageBack.setAttribute('src','https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB');
    newCardImageBack.setAttribute('class','card-img-back');
    newCardImageBack.setAttribute('alt','adalab');

    newCardItem.appendChild(newCardImageFront);
    newCardItem.appendChild(newCardImageBack);

    return cardList.appendChild(newCardItem);
  });
}

function handleClick (){
  console.log('estoy clickando');
  event.preventDefault();
  askForCards();
  
}



button.addEventListener('click', handleClick);

for (var i = 0; i < inputRadio.length; i++){
  inputRadio[i].addEventListener('click', handleInputChange);
}