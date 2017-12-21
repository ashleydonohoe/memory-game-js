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
    let numberOfLockedCards;

    let numberOfMoves;

    // initialize as 3 by default
    let numberOfStars;

    let timer;
    let time = 0;


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

    function updateStarRating() {
        if(numberOfMoves < 12) {
            numberOfStars = 3;
            document.getElementsByClassName('stars')[0].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        } else if (numberOfMoves >= 12 && numberOfMoves < 18) {
            numberOfStars = 2;
            document.getElementsByClassName('stars')[0].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        } else {
            numberOfMoves = 1;
            document.getElementsByClassName('stars')[0].innerHTML = '<li><i class="fa fa-star"></i></li>';
        }

    }

    function endGame() {
        alert(time);
        clearInterval(timer);
        document.getElementById('numberOfMoves').textContent = numberOfMoves;
        document.getElementById('numberOfStars').textContent = numberOfStars;
    }

    function setUpInteraction() {
        const gameCards = document.getElementsByClassName('card');

        document.getElementsByClassName('restart')[0].addEventListener('click', startGame);

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
                       updateStarRating();
                       // Check match
                       if(openCards[0].content == openCards[1].content) {
                           console.log("it's a match!");
                           // Increase number of locked cards by 2
                           numberOfLockedCards += 2;

                           if(numberOfLockedCards == cards.length) {
                               console.log("User won!");
                               // show modal with time, rating and play again option
                               endGame();
                           }
                       } else {
                           console.log('not a match');
                           // Remove classes and close cards
                           const card1 = openCards[0].id;
                           const card2 = openCards[1].id;

                           // Delays the cards from flipping too fast back to closed state
                           setTimeout(function() {
                               document.getElementById(card1).classList.remove('open');
                               document.getElementById(card1).classList.remove('show');
                               document.getElementById(card2).classList.remove('open');
                               document.getElementById(card2).classList.remove('show');
                           }, 1000);

                       }

                       // Reset open cards
                       openCards = [];
                   }
               }
            });
        }

    }

    function startGame() {
        openCards = [];
        time = 0;
        numberOfLockedCards = 0;

        numberOfMoves = 0;

        // initialize as 3 by default
        numberOfStars = 3;

        const shuffleDeck = shuffle(cards);
        const actualCards = createCards(shuffleDeck);


        document.getElementById('deck').innerHTML = actualCards;

        setUpInteraction();


        // Used as reference for clearing and setting timer: https://www.w3schools.com/js/js_timing.asp
        timer = setInterval(function() {
            time += 1;
            console.log(time);
        }, 1000);
    }

    startGame();


}());
