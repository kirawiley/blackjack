console.log('Playing a game of blackjack with 4 players!')

const players = [
  {
    name: 'You',
    cards: [ deal(), deal() ]
  },
  {
    name: 'Player 1',
    cards: [ deal(), deal() ]
  },
  {
    name: 'Player 2',
    cards: [ deal(), deal() ]
  },
  {
    name: 'Dealer',
    cards: [ deal(), deal() ]
  }
]

function Card(suit, number, points) {
  return {
    suit: suit,
    number: number,
    points: points
  }
}

function deal() {
  const cardSuit = Math.floor(Math.random() * (5 - 1)) + 1
  const cardNumber = Math.floor(Math.random() * (14 - 1)) + 1
  return new Card(getSuit(cardSuit), getFace(cardNumber), getPoints(cardNumber))
}

function getSuit(suit) {
  if (suit === 1) {
    return 'Hearts'
  }
  else if (suit === 2) {
    return 'Diamonds'
  }
  else if (suit === 3) {
    return 'Clubs'
  }
  else if (suit === 4) {
    return 'Spades'
  }
}

function getFace(number) {
  if (number === 1) {
    return 'Ace'
  }
  else if (number === 11) {
    return 'Jack'
  }
  else if (number === 12) {
    return 'Queen'
  }
  else if (number === 13) {
    return 'King'
  }
  else {
    return number
  }
}

function getPoints(number) {
  //Jack, King, Queen
  if (number === 11 | number === 12 | number === 13) {
    return 10
  }
  //Ace
  else if (number === 1) {
    return 11
  }
  //Number Card
  else {
    return number
  }
}

function getSum(player) {
  const sum = player.cards.reduce((a, b) => {
    return a.points + b.points
  })
  return sum
}

function getCard(player) {
  let cardType = ''
  player.cards.forEach((card) => {
    cardType += card.number + ' of ' + card.suit + ', '
  })
  return cardType
}

function announceCards() {
  players.forEach((player) => {
    const results = getCard(player) + 'Total: ' + getSum(player)
    if (player.name === 'You') {
      console.log('You have: ' + results)
    }
    else {
      console.log(player.name + ' has: ' + results)
    }
  })
}

function findWinner() {
  const lessThan22 = []
  players.forEach((player) => {
    const sum = getSum(player)
    if (sum < 22) {
      lessThan22.push(sum)
    }
  })
  const winner = Math.max(...lessThan22)
  return winner
}

function announceWinner() {
  players.map((player) => {
   if (findWinner() === getSum(player)) {
      if (player.name === 'You') {
        console.log('You win!')
      }
      else {
        console.log(player.name + ' wins!')
      }
    }
  })
}

announceCards()
announceWinner()
