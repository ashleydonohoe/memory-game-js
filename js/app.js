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
            numberOfStars = 1;
            document.getElementsByClassName('stars')[0].innerHTML = '<li><i class="fa fa-star"></i></li>';
        }

    }

    function endGame() {
        // Clear timer and fill out modal content
        clearInterval(timer);
        document.getElementById('numberOfMoves').textContent = numberOfMoves;
        document.getElementById('numberOfStars').textContent = numberOfStars;
        document.getElementById('numberOfSeconds').textContent = time;
        document.getElementById('play-again').addEventListener('click', startGame);

        // Show modal and hide main content
        document.getElementsByClassName('container')[0].style.display = 'none';
        document.getElementById('modal').style.display = "block";
    }

    function checkForMatch() {
        // If there are two open cards, check for match
        if(openCards.length == 2) {
            // Increase number of moves and update UI
            numberOfMoves++;
            document.getElementById('moves').textContent = numberOfMoves;
            updateStarRating();

            // Check if both cards have same symbol
            if(openCards[0].content == openCards[1].content) {
                console.log("it's a match!");
                // Increase number of locked cards by 2
                numberOfLockedCards += 2;

                // If all cards are open, then it's time to end the game
                if(numberOfLockedCards == cards.length) {
                    // show modal with time, rating and play again option for winner
                    endGame();
                }
            } else {
                // Remove classes and close cards since they're not matches
                const card1 = openCards[0].id;
                const card2 = openCards[1].id;

                // Delays the cards from flipping too fast back to closed state
                setTimeout(function() {
                    document.getElementById(card1).classList.remove('open');
                    document.getElementById(card1).classList.remove('show');
                    document.getElementById(card2).classList.remove('open');
                    document.getElementById(card2).classList.remove('show');
                }, 500);
            }

            // Reset open cards
            openCards = [];
        }
    }

    function setUpInteraction() {
        const gameCards = document.getElementsByClassName('card');

        document.getElementsByClassName('restart')[0].addEventListener('click', startGame);

        for(let i = 0; i < gameCards.length; i++) {
            gameCards[i].addEventListener('click', function(event) {

               // If less than two cards open and the card clicked isn't already open, add the card to the array for open cards
               if(openCards.length < 2 && !gameCards[i].classList.contains('open')) {
                   gameCards[i].classList.add('show');
                   gameCards[i].classList.add('open');
                   openCards.push({content: gameCards[i].textContent, id: event.target.id});

                   // If two cards are open, check for match
                   checkForMatch();
               }
            });
        }

    }

    function startGame() {
        // Reset variables
        openCards = [];
        time = 0;
        numberOfLockedCards = 0;

        numberOfMoves = 0;

        // initialize as 3 by default
        numberOfStars = 3;

        // Hide modal if open and show container if not visible
        document.getElementById('modal').style.display = 'none';
        document.getElementsByClassName('container')[0].style.display = 'flex';

        // Shuffle deck and add new cards to page
        const shuffleDeck = shuffle(cards);
        const actualCards = createCards(shuffleDeck);
        document.getElementById('deck').innerHTML = actualCards;

        // Setup the event listeners
        setUpInteraction();

        // Start the timer
        // Used as reference for clearing and setting timer: https://www.w3schools.com/js/js_timing.asp
        timer = setInterval(function() {
            time += 1;
            document.getElementById('timer').textContent = time + ' seconds';
        }, 1000);
    }

    // Start the game on page load
    startGame();
}());
