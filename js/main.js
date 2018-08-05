'use strict';

var button = document.querySelector('.start-button');
var inputRadio = document.querySelectorAll('.radio');
var cardList = document.querySelector('.cardList');

var jsonResponse;
var urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/4.json';
var imgClickedPair =[];

function handleInputChange() {
  urlForFetch = 'https://raw.githubusercontent.com/Adalab/cards-data/master/'+ event.target.value +'.json';
}

function handleCardItemClick(){
  var cardItem = document.querySelectorAll('.card-item');
  var itemClickedImg = event.currentTarget.children;
  var frontImg = event.currentTarget.firstChild;
  var backImg = event.currentTarget.lastChild;
  console.log('last',backImg);
  for (var x = 0; x < itemClickedImg.length; x++){
    itemClickedImg[x].classList.toggle('hidden');
    
  }
  if (imgClickedPair.length ===2){
    imgClickedPair = [];
  }
  if (backImg.classList.contains('hidden')){
    console.log('pair', frontImg.dataset.pair);
    imgClickedPair.push(frontImg.dataset.pair);
  }
  if(imgClickedPair[0]===imgClickedPair[1]){
    console.log('parejaaaa');
    for(var z = 0; z < cardItem.length; z++){
      if (imgClickedPair[0]===cardItem[z].firstChild.dataset.pair){
        console.log('dobles,dobles');
        cardItem[z].removeEventListener('click',handleCardItemClick);
      }
    }
  }
  console.log('array', imgClickedPair);
  console.log('children',itemClickedImg);
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
    var pairNumber = card.pair;
    var newCardItem = document.createElement('li');
    var newCardImageFront = document.createElement('img');
    var newCardImageBack = document.createElement('img');

    newCardItem.setAttribute('class','card-item');

    newCardImageFront.setAttribute('src',imgCardUrl);
    newCardImageFront.setAttribute('class','card-img-front');
    newCardImageFront.classList.add('hidden','cardFront');
    newCardImageFront.setAttribute('alt','pokemon');
    newCardImageFront.setAttribute('data-pair',pairNumber);
    
    newCardImageBack.setAttribute('src','https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB');
    newCardImageBack.setAttribute('class','card-img-back');
    newCardImageBack.classList.add('cardBack');
    newCardImageBack.setAttribute('alt','adalab');

    newCardItem.appendChild(newCardImageFront);
    newCardItem.appendChild(newCardImageBack);

    return cardList.appendChild(newCardItem);
  });
  var cardItem = document.querySelectorAll('.card-item');
  for (var k = 0; k < cardItem.length; k++){
    cardItem[k].addEventListener('click', handleCardItemClick);
  }
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