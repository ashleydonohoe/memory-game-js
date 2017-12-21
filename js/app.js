/*
 * Create a list that holds all of your cards
 */
//
// (function () {
//     'use strict';
// }
//
//
// /*
//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  */
//
//
// }());
//
//
// /*
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  *  - if the list already has another card, check to see if the two cards match
//  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
//  */

(function () {
    'use strict';

    // Deck of 16 cards using Font Awesome class names for symbols
    const cards = [
        'fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor',
        'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb',
        'fa-bomb'
    ];

    let openCards = [];
    let numberOfLockedCards = 0;

    let numberOfMoves = 0;

    // initialize as 3 by default
    let numberOfStars = 3;


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // Create the cards that will appear on the page
    function createCards(shuffledDeck) {
        let listCode = "";
        shuffledDeck.forEach(function(card, index) {
             listCode += '<li id="' + index + '" class="card">' + card + '<i class="fa ' + card + '"></i></li>';
         });

        return listCode;
    }

    function setUpInteraction() {
        const gameCards = document.getElementsByClassName('card');

        for(let i = 0; i < gameCards.length; i++) {
            gameCards[i].addEventListener('click', function(event) {

               // If less than two cards open, add the card to the array
               if(openCards.length < 2) {
                   gameCards[i].classList.add('show');
                   gameCards[i].classList.add('open');
                   openCards.push({content: gameCards[i].textContent, id: event.target.id});


                   // If two cards are open, check for match
                   if(openCards.length == 2) {
                       console.log('Time to check!');
                       console.log(openCards);
                       // Increase number of moves
                       numberOfMoves++;
                       document.getElementById('moves').textContent = numberOfMoves;
                       // Check match
                       if(openCards[0] == openCards[1]) {
                           console.log("it's a match!");
                           // Increase number of locked cards by 2
                           numberOfLockedCards += 2;
                       } else {
                           console.log('not a match');
                           // Remove classes and close cards
                           const card1 = openCards[0].id;
                           const card2 = openCards[1].id;
                           document.getElementById(card1).classList.remove('open');
                           document.getElementById(card1).classList.remove('show');
                           document.getElementById(card2).classList.remove('open');
                           document.getElementById(card2).classList.remove('show');

                           // Reset empty cards
                           openCards = [];

                       }
                   }
               }
            });
        }

    }

    const shuffleDeck = shuffle(cards);
    const actualCards = createCards(shuffleDeck);


   document.getElementById('deck').innerHTML = actualCards;

   setUpInteraction();

}());
