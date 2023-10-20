console.log('see mee')
const allquiz = document.querySelector('#allquiz').value
const parseddeck = JSON.parse(allquiz)
console.log(parseddeck)
console.log(parseddeck.cards)
const newCards = parseddeck.cards.map((card, index) => {
    return {
        name: card.term,  // changing 'name' to 'term'
        matchValue: card.definition,
        hint: card.term.split(0,1),  // there's no direct mapping for image, so leaving it blank
        seenHint: false,
        content: {
            primary: card.definition,
            // secondary: card.term,
          },
        // ... any other properties you need to map
    };
});
console.log(newCards)
const decks = [
  {
    name: parseddeck.title,
    author: parseddeck.author.username,
    instructions:
      "The emoji/s on each card are a clue for an animated movie. You can flip (click) the card to see an additional hint. Drag and drop a card onto the matching text clue on the right, which will be the movie name in easy mode, and a character/place in the movie in the challenging mode. You can make a maximum of 3 wrong matches.",
   
      cards: newCards,
    
  },
  


]


export function getShuffledDeck(category) {
  const cardDeck = decks.find((deck) => deck.name === category).cards;
  for (let i = cardDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck;
}

export function getAuthor(category) {
  return decks.find((deck) => deck.name === category).author;
}

export function getInstructions(category) {
  return decks.find((deck) => deck.name === category).instructions;
}
