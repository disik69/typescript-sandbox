import { log } from "./log";

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

interface Card {
    suit: string;
    card: number;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return (): Card => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

log("card: " + pickedCard.card + " of " + pickedCard.suit);
