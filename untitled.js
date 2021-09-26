// initialising the player and computer cards
var turn = "player";
var player = [];
var computer = [];
// var cardValues = [];

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardVal = rankCounter;

      var cardName = cardVal;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardVal = 11
        cardName = "ace";
      } else if (cardName == 11) {
        cardVal = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        cardVal = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        cardVal = 10;
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value : cardVal
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var cardDecks = shuffleCards(makeDeck());

// pushing the cards into the player and computer's respective arrays
var cardMembers = function (cardValues) {
  cardValues.push(cardDecks.pop());
};

//name cards
var values = function (cardValues) {
  var card_names = "";
  for (var y = 0; y < cardValues.length; ) {
    var currCard = cardValues[y];
    if (currCard.value) {
      card_names += cardValues[y].name;
    }
    y += 1;
  }
  return card_names;
};

//total cards of each players holding
// var sum = function (cardValues) {
//   var total = 0;
//   for (var i = 0; i < cardValues.length; i++) {
//     total += cardValues[i].rank;
//   }
//   return total;
// };
// ace values
// after hit , if the total exceeds more than 10 then the ace rank (values) will be 1
// if it doesnt exceed 10, the ace rank would be 11
// by deafult ace is considered as one

var ace_values = function (cardValues)
{
    var ace_no = 0;
    var counter = 0;
    var total = 0;
    while (counter < cardValues.length){
      var current_Card = cardValues[counter];
      if (current_Card.value == 1)
      {
        ace_no += 1;
        total += 11;
      }
      else{
        total += current_Card.value;
      }
      counter += 1;
    }

    if (total > 21 && ace_no > 0)
    {
      for (var aCounter = 0; aCounter < ace_no; aCounter++)
      {
        total -= 10;
        if (total <= 21)
        {
          break;
        }

        aCounter += 1;
      }
    }

    return total;
}

var myImage = '<img src="https://c.tenor.com/EnRojaH2AH4AAAAC/confused-meme.gif"/>';
var winmage = '<img src="https://c.tenor.com/tZGM8sQwlFwAAAAC/spongebob-cant-wait.gif"/>';
var tiemage = '<img src="https://c.tenor.com/SEguX7LvdTQAAAAC/launch-dragon-ball.gif"/>';



var winning = function()
{

if (totalDeck_computer > 21)
{
  return `Computer LOST!!! ${myImage}`;
}

else if (totalDeck_player > 21)
{
  return `player LOST!!! ${myImage}`;
}

//   else if (totalDeck_computer <= 17)
// {
//   cardMembers(computer);
//   computer_card = values(computer);
//     totalDeck_computer = ace_values(computer);
//     playerCard = values(player);
//     totalDeck_player = ace_values(player);
  
// }
else if (totalDeck_player > totalDeck_computer)
{
  return `Player Wins!!!! Congratulations!!! ${winmage}`;
}
else if (totalDeck_player < totalDeck_computer)
{
  return `Computer Wins!!! Congratulations!!! ${winmage}`;
}

else if (totalDeck_player == totalDeck_computer)
{
  return `Sadly, It is a tie!!! ${tiemage}`;
}

};

var blackJack = function ()
{
  // checking whether each player has 21 in total
  var messages = "";
  
  if(totalDeck_player === 21)
{
  messages =  `You Win!!!!!!`;
  gameOver = true;
}

else if(totalDeck_computer === 21)
{
  messages =  `You Win!!!!!!`;
  gameOver = true;
}

  return messages;

}

  var gameOver = false;
  var playerCard = ""; // player cards
  var computer_card = ""; // computer cards
  var message = "";
  var totalDeck_player = 0; // sum of the player cards
  var totalDeck_computer  = 0; // sum of the computer cards

var main = function (input) {

  // game starts with player
  if (turn == "player") {
    // clicking the submit button
    if (input == "") {
      cardMembers(player); // drawing the first card for the player
      cardMembers(player); // drawing the second card for the player
      playerCard = values(player); // inserting the 2 cards into the playerCard array
      totalDeck_player = ace_values(player); // totalling the sum of the cards in the playerCard
       var beta = blackJack(); // checking if the sum already hits 21

      computer_card = values(computer); // showing computer card values
      totalDeck_computer = ace_values(computer); // totalling computer cards


      message = `Player Cards are ${playerCard} Total Cards : ${totalDeck_player}<br>  
      Computer Cards are ${computer_card}  Total Cards : ${totalDeck_computer} <br> ${beta}`;

      turn = "computer";
    }
    // if player choose to hit, draw a card
    if (input == "hit") {
      cardMembers(player); // draw one card for the player
      playerCard = values(player); // adding it up to the array
      totalDeck_player = ace_values(player); // sum up the cards
      computer_card = values(computer); // showing the card of the computers as well
      totalDeck_computer = ace_values(computer); // total of the card 
      var beta = blackJack(); // checking if after hitting hit, if the card has 21 
      var aku = winning(); //checking the winning conditions
      console.log(totalDeck_player);

      if(!gameOver){
      message = `Player Cards are ${playerCard}. Total Cards : ${totalDeck_player}<br>  
      Computer Cards are ${computer_card}.  Total Cards : ${totalDeck_computer} <br>  ${beta} <br> ${aku}`;
      }
      else {
            message = `Player Cards are ${playerCard}.Total Cards : ${totalDeck_player}<br>  
      Computer Cards are ${computer_card}.  Total Cards : ${totalDeck_computer}`;
       }
      }

    // when player choose to stand, change turn to computer
    if (input == "stand") {
      cardMembers(computer); // draw a card for computer when choose stand
      playerCard = values(player); // showing player cards
      totalDeck_player = ace_values(player); // total of the player cards
      computer_card = values(computer); // insert the drawn card to the computer card array
      totalDeck_computer = ace_values(computer); // sum of the new drawncard with the cards in hand
      var beta = blackJack(); // checking blackjack
      var aku = winning(); // checking the winning condition

    if(!gameOver){
      message = `Player Cards are ${playerCard}. Total Cards : ${totalDeck_player}<br>  
      Computer Cards are ${computer_card}.  Total Cards : ${totalDeck_computer} <br>  ${beta} <br> ${aku}`;
      }
      else {
            message = `Player Cards are ${playerCard}. Total Cards : ${totalDeck_player}<br>  
      Computer Cards are ${computer_card}.  Total Cards : ${totalDeck_computer}`;
       }

    }
  }
  // when it is computer's turn, draw 2 cards & play game
  if (turn == "computer") {
    cardMembers(computer); // first card of computer drawn
    cardMembers(computer); //second card of computer drawn
    computer_card = values(computer); // inserting the values into the array
    totalDeck_computer = ace_values(computer); // total the cards in the current array
    playerCard = values(player); // shows the player cards
    totalDeck_player = ace_values(player); // show the total of the player cards
    var beta = blackJack(); // checking the blackjack 

    message = `Player Cards are ${playerCard}. Total Cards : ${totalDeck_player}<br>  
    Computer Cards are ${computer_card}.  Total Cards : ${totalDeck_computer} <br> ${beta}`;
    turn = "player";

  }

return message;

};