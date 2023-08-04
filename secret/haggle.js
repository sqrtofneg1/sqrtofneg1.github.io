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
      calculateScore(allPlayers[allPlayers.length - 1]);
      updateStandings();
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
          if(element.id.toString().length == 3) {
            let cardIdString = element.id.toString();
            cards.push(new Card(cardIdString.substr(0, 2), element.id[2]))
          } else {
            cards.push(new Card(element.id[0], element.id[1]))
          }
        }
      })
      let hand = new Hand(cards);
      let player = new Player(hand, $('#addPlayer_Name').val());
      allPlayers.push(player);
      console.log(player);
      return true;
    } else {
      return false;
    }
  }

  function calculateScore(player) {

    const valueOccurrences = player.hand.cardValues.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    const suitOccurrences = player.hand.cardSuits.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    
    //rule 4 (nothing to do with points)

    //rule 6 (nothing to do with points)
    
    //rule 8:
    let faceCardValues = ["A", "K", "Q", "J"];
    let numberCardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
    for(i = 0; i < player.hand.cardValues.length; i++) {
      if(faceCardValues.includes(player.hand.cardValues[i])) {
        player.hand.cards[i].points = 10;
        player.hand.cards[i].rules.push(8);
      }
    }

    //rule 9 (nothing to do with points)

    //rule 10:
    if ([...valueOccurrences.values()].includes(4)) {
      player.hand.bonusPoints += 25;
      player.hand.bonusPointsRules.push(10);
    }

    //rule 12:
    for(i = 0; i < player.hand.cardValues.length; i++) {
      if(player.hand.cardValues[i] == "Jkr") {
        player.hand.cards[i].points = 0;
        player.hand.cards[i].rules.push(12);
      }
    }

    //rule 14:
    let blackCount = suitOccurrences.get("C") ? suitOccurrences.get("C") : 0 + suitOccurrences.get("S") ? suitOccurrences.get("S") : 0;
    let redCount = suitOccurrences.get("D") ? suitOccurrences.get("D") : 0 + suitOccurrences.get("H") ? suitOccurrences.get("H") : 0;
    if(blackCount == redCount) {
      player.hand.bonusPoints += 10;
      player.hand.bonusPointsRules.push(14);
    }

    //rule 15:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardValues[i] == "2" && player.hand.cardSuits[i] == "D") {
        player.hand.cards[i].points = 7;
        player.hand.cards[i].rules.push(15);
      }
    }

    //rule 16:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardValues[i] == "J") {
        player.hand.cards[i].points = 4;
        player.hand.cards[i].rules.push(16);
      }
    }

    //rule 18:
    if(player.hand.cardValues.length == 4) {
      player.hand.bonusPoints += 10;
      player.hand.bonusPointsRules.push(18);
    }

    //rule 20:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardSuits[i] == "C") {
        if(numberCardValues.includes(player.hand.cardValues[i])) {
          player.hand.cards[i].points = parseInt(player.hand.cardValues[i]);
          player.hand.cards[i].rules.push(20);
        }
      }
    }

    //rule 21:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardSuits[i] == "H") {
        if(numberCardValues.includes(player.hand.cardValues[i])) {
          player.hand.cards[i].points = parseInt(player.hand.cardValues[i]) - 5;
          player.hand.cards[i].rules.push(21);
        }
      }
    }

    //rule 22:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardSuits[i] == "D") {
        if(numberCardValues.includes(player.hand.cardValues[i])) {
          player.hand.cards[i].points = 7;
          player.hand.cards[i].rules.push(22);
        }
      }
    }

    //rule 24:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardSuits[i] == "S") {
        if(numberCardValues.includes(player.hand.cardValues[i])) {
          player.hand.cards[i].points = Math.abs(12 - parseInt(player.hand.cardValues[i]));
          player.hand.cards[i].rules.push(24);
        }
      }
    }

    //rule 25:
    if(suitOccurrences.get("H") == 2 || suitOccurrences.get("H") == 4) {
      for(i = 0; i < player.hand.cards.length; i++) {
        if(player.hand.cardSuits[i] == "H") {
          if(numberCardValues.includes(player.hand.cardValues[i])) {
            player.hand.cards[i].points = player.hand.cards[i].points * 2;
            player.hand.cards[i].rules.push(25);
          }
        }
      }
    }

    //rule 26:
    if(suitOccurrences.get("C") == 3) {
      for(i = 0; i < player.hand.cards.length; i++) {
        if(player.hand.cardSuits[i] == "C") {
          if(numberCardValues.includes(player.hand.cardValues[i])) {
            player.hand.cards[i].points = player.hand.cards[i].points * 2;
            player.hand.cards[i].rules.push(26);
          }
        }
      }
    }

    //rule 27:
    if(suitOccurrences.get("S") == 1) {
      player.hand.bonusPoints += 3;
      player.hand.bonusPointsRules.push(27);
    }

    //rule 28:
    if([...valueOccurrences.values()].includes(3)) {
      player.hand.bonusPoints += 10;
      player.hand.bonusPointsRules.push(28);
    }

    //rule 30:
    let rule30 = true;
    for(i = 0; i < player.hand.cards.length; i++) {
      if(faceCardValues.includes(player.hand.cardValues[i])) {
        rule30 = false;
        break;
      } else {
        if(parseInt(player.hand.cardValues[i]) % 2 != 0){
          rule30 = false;
          break;
        }
      }
    }
    if(rule30) {
      player.hand.bonusPoints += 15;
      player.hand.bonusPointsRules.push(30);
    }

    //rule 32:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardValues[i] == "A" && player.hand.cardSuits == "S") {
        player.hand.cards[i].points = -7;
        player.hand.cards[i].rules.push(32);
      }
    }

    //rule 33:
    for(i = 0; i < player.hand.cards.length; i++) {
      if(player.hand.cardValues[i] == "K") {
        let suitToMatch = player.hand.cardSuits[i];
        for(j = 0; j < player.hand.cards.length; j++) {
          if(player.hand.cardValues[j] == "Q" && player.hand.cardSuits[j] == suitToMatch) {
            player.hand.bonusPoints += 7;
            player.hand.bonusPointsRules.push(33);
          }
        }
      }
    }

    //rule 34 (nothing to do with points)

    //rule 35:
    if(suitOccurrences.get("S") == 1 && suitOccurrences.get("H") == 1 && suitOccurrences.get("C") == 1 && suitOccurrences.get("D") == 1) {
      player.hand.bonusPoints += 15;
      player.hand.bonusPointsRules.push(35);
    }

    //rule 36:
    if(blackCount == 0) {
      player.hand.bonusPoints += -10;
      player.hand.bonusPointsRules.push(36);
    }

    //rule 38: (flush)
    if(suitOccurrences.get("S") == 5 || suitOccurrences.get("H") == 5 || suitOccurrences.get("C") == 5 || suitOccurrences.get("D") == 5) {
      player.hand.bonusPoints += 20;
      player.hand.bonusPointsRules.push(38);
    }

    //longest consecutive sequence
    const LCS = (arr) => {
      //get unique
      arr = [...new Set(arr)];
      arr = arr.map(x => {
        return parseInt(x);
      })
      const badIndex = arr.indexOf(NaN);
      if(badIndex > -1) {
        arr.splice(badIndex, 1);
      }

      //sort
      arr = arr.sort((a,b) => a - b);
    
      let max = 0;
      let count = 0;
      // find the maximum length
      // by traversing the array
      for (let i = 0; i < arr.length; i++) {
        // check if the current element is
        // equal to previous element +1
        if (i > 0 && arr[i] === arr[i - 1] + 1){
          count++;
        }
        else{
          count = 1;
        }
        // Update the maximum
        max = Math.max(max, count);
      }
      
      return max;
    }

    //rule 39: (straight)
    if(LCS([...valueOccurrences.keys()]) == 5) {
      player.hand.bonusPoints += 25;
      player.hand.bonusPointsRules.push(39);
    }

  }

  function getStandingsHeader() {
    return `<div class="playerCard"><h4>Rank</h4><h4>Name</h4><h4>Hand</h4><h4>Base Pts</h4><h4>Bonus Pts</h4><h4>Total Pts</h4></div>`
  }

  function updateStandings() {
    sortPlayers();
    $('#standings').empty();
    $('#standings').append(getStandingsHeader());
    allPlayers.forEach(player => {
      $('#standings').append(player.getPlayerCard(allPlayers.indexOf(player)));
    })
  }

  function sortPlayers() {
    allPlayers.sort((a, b) => (a.getTotalPoints() < b.getTotalPoints()) ? 1 : (a.getTotalPoints() == b.getTotalPoints()) ? ((a.name < b.name) ? 1 : -1) : -1);
  }
  
  function Card(cardValue = null, suit = null) {
    this.cardValue = cardValue;
    this.suit = suit;
    this.points = 0;
    this.rules = [];
  }

  Card.prototype.getHtmlString = function() {
    if(this.cardValue == null && this.suit == null) {
      return `<span id="Joker" class="cardStandings" title="${this.points} pts. Rules: ${this.rules}">Jkr</span>`
    } else {
      let icon = suitIcons[allCardSuits.indexOf(this.suit)]
      return `<span id="${this.cardValue}${this.suit}" class="cardStandings" title="${this.points} pts. Rules: ${this.rules}">${this.cardValue} ${icon}</span>`
    }
  }
  
  function Hand(cards) {
    this.cards = cards;
    this.bonusPoints = 0;
    this.bonusPointsRules =[];
    this.cardValues = [];
    this.cardSuits = [];
    cards.forEach(card => {
      this.cardValues.push(card.cardValue);
      this.cardSuits.push(card.suit);
    });
  }
  
  Hand.prototype.getBasePoints = function() {
    let baseHandValue = 0;
    this.cards.forEach(card => {
      baseHandValue += card.points;
    });
    return baseHandValue;
  }

  Hand.prototype.getTotalPoints = function() {
    return this.bonusPoints + this.getBasePoints();
  }

  function Player(hand, playerName) {
    this.hand = hand;
    this.playerName = playerName;
  }

  Player.prototype.getTotalPoints = function() {
    return this.hand.getTotalPoints();
  }

  Player.prototype.getPlayerCard = function(index) {
    let htmlString = `<div class="playerCard"><div class"playerRank">${index + 1}</div><div class="playerName">${this.playerName}</div><div class ="playerCards">`;
    this.hand.cards.forEach(card => {
      htmlString += card.getHtmlString();
    });
    htmlString += `</div><div class="playerBasePoints">${this.hand.getBasePoints()}</div><div class="playerBonusPoints" title="Rules:${this.hand.bonusPointsRules}">${this.hand.bonusPoints}</div><div class="playerTotalPoints">${this.hand.getTotalPoints()}</div></div>`
    return htmlString;
  }

});