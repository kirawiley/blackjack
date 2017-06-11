console.log('Playing a game of blackjack with 4 players!')

const deck = createDeck()

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

function createDeck() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
  const cards = []

  for (let s = 0; s < suits.length; s++) {
    for (let n = 0; n < numbers.length; n++) {
      cards.push(new Card(suits[s], getFace(numbers[n]), getPoints(numbers[n])))
    }
  }
  return cards
}

function Card(suit, number, points) {
  return {
    suit: suit,
    number: number,
    points: points
  }
}

function deal() {
  const index = Math.floor(Math.random() * deck.length)
  const card = deck[index]
  const removed = deck.splice(index, 1)
  return card
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

console.log(deck)
announceCards()
announceWinner()
