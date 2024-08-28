export class Game {
    player: string[] = [];
    cardDeck: string[] = [];
    playdCards: string[] = [];
    currentPlayer: number = 0;
    deckOffset: number = 0.2;

    constructor() {
        for (let i = 1; i <= 13; i++) {
            this.cardDeck.push(`spades_${i}`);
            this.cardDeck.push(`clubs_${i}`);
            this.cardDeck.push(`hearts_${i}`);
            this.cardDeck.push(`diamonds_${i}`);
            this.shuffle(this.cardDeck);
        }
    }

    shuffle(cards: string[]) {
        let currentIndex = cards.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [cards[currentIndex], cards[randomIndex]] = 
            [cards[randomIndex], cards[currentIndex]];
        }
    }
}