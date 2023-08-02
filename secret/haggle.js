$(document).ready(function() {

  let allCardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  let allCardSuits = ["S", "H", "C", "D"]
  let suitIcons = [`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" class="bi bi-suit-spade-fill" viewBox="0 0 16 16">
                     <path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907z"/>
                    </svg>`,
                   `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                     <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                    </svg>`,
                   `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" class="bi bi-suit-club-fill" viewBox="0 0 16 16">
                     <path d="M11.5 12.5a3.493 3.493 0 0 1-2.684-1.254 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5z"/>
                    </svg>`,
                   `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" class="bi bi-suit-diamond-fill" viewBox="0 0 16 16">
                     <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2z"/>
                    </svg>`
                   ]

  let allPlayers = []

  $("#addPlayerButton").click(function() {
    clearForm();
    $('#exampleModal').modal('show')
  });

  $("#confirmAddPlayer").click(function () {
    if (addPlayer()) {
      $('#exampleModal').modal('hide');
      clearForm();
    }
  });

  $(".close").click(function() {
    $('#exampleModal').modal('hide');
  });

  $("body").on('click', '.cardUnselected', function() {
    $(this).addClass("cardSelected");
    $(this).removeClass("cardUnselected");
  })

  $("body").on('click', '.cardSelected', function() {
    $(this).addClass("cardUnselected");
    $(this).removeClass("cardSelected");
  })

  function clearForm() {
    $('#addPlayer_Name').val('');
    resetCardSelect();
  }

  function resetCardSelect() {
    $('#cardSelect').empty();
    let cardString = ``
    allCardSuits.forEach(suit => {
      allCardValues.forEach(val => {
        let icon = suitIcons[allCardSuits.indexOf(suit)]
        cardString += `<span id="${val}${suit}" class="cardUnselected">${val} ${icon}</span>`
      });
    });
    cardString += `<span id="Joker" class="cardUnselected">Jkr</span>`
 
    $('#cardSelect').append(cardString);
  }

  function addPlayer() {
    if($('.cardSelected').length == 5 || confirm("Player does not have 5 cards. Continue?")) {
      let cards = [];
      $('.cardSelected').each(function(index, element) {
        if(element.id == "Joker") {
          cards.push(new Card());
        } else {
          cards.push(new Card(element.id[0], element.id[1]))
        }
      })
      let hand = new Hand(cards);
      let player = new Player(hand, $('#addPlayer_Name').val);
      allPlayers.push(player);
      console.log(player);
      return true;
    } else {
      return false;
    }
  }

  function updateStandings() {
    sortPlayers();
    $('#standings').empty();
    allPlayers.forEach(player => {
      $('#standings').append(player.getPlayerCard());
    })
  }

  function sortPlayers() {
    allPlayers.sort((a, b) => (a.getTotalPoints() > b.getTotalPoints()) ? 1 : (a.getTotalPoints() == b.getTotalPoints()) ? ((a.name > b.name) ? 1 : -1) : -1);
  }
  
  function Card(cardValue = null, suit = null) {
    this.cardValue = cardValue;
    this.suit = suit;
    this.points = 0;
  }

  Card.prototype.getHtmlString = function() {
    if(this.cardValue == null && this.suit == null) {
      return `<span id="Joker" class="cardSelected">Jkr</span>`
    } else {
      let icon = suitIcons[allCardSuits.indexOf(this.suit)]
      return `<span id="${this.cardValue}${this.suit}" class="cardUnselected">${this.cardValue} ${icon}</span>`
    }
  }
  
  function Hand(cards) {
    this.cards = cards;
    this.bonusPoints = 0;
  }
  
  Hand.prototype.getTotalPoints = function() {
    let baseHandValue = 0;
    this.cards.forEach(card => {
      baseHandValue += card.cardValue;
    });
    return this.bonusPoints + baseHandValue;
  }

  function Player(hand, name) {
    this.hand = hand;
    this.name = name;
  }

  Player.prototype.getTotalPoints = function() {
    return this.hand.getTotalPoints();
  }

  Player.prototype.getPlayerCard = function() {
    return `<div class="playerCard"></div>`
  }

});