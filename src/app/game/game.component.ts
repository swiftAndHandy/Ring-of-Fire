import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  drawCardAnimation: boolean = false;
  game: Game;
  calculatedOffset: number = 0;

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    console.log(this.game);
    this.calculatedOffset = -(this.game.cardDeck.length / 2) * 2;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(playernameToAdd => {
      this.game.players.push(playernameToAdd);

    });
  }

  drawCard() {
    if (!this.drawCardAnimation && this.game.players.length > 0) {
      this.drawCardAnimation = true;
      let currentCard = this.game.cardDeck.pop();
      if (currentCard !== undefined) {
        this.game.playedCards.push(currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer === this.game.players.length ? 0 : this.game.currentPlayer;
        console.log(this.game.currentPlayer);

        setTimeout(() => {
          this.drawCardAnimation = false;
        }, 1000);
      }
    }
  }
}
