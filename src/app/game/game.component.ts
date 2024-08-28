import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  drawCardAnimation: boolean = false;
  game: Game;
  calculatedOffset: number = 0;

  constructor() {
    this.game = new Game();
    console.log(this.game);
    this.calculatedOffset = -(this.game.cardDeck.length / 2) * 2;
    console.log(this.game.playedCards.length);

  }

  drawCard() {
    if (!this.drawCardAnimation) {
      this.drawCardAnimation = true;
      let currentCard = this.game.cardDeck.pop();
      if (currentCard !== undefined) {
        this.game.playedCards.push(currentCard);
      }
      setTimeout(() => {
        this.drawCardAnimation = false;
      }, 1000);
    }
  }
}
