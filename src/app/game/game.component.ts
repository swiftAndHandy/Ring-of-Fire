import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { CardDescriptionComponent } from "../card-description/card-description.component";
import { FirebaseService } from '../services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatDialogModule, CardDescriptionComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  drawCardAnimation: boolean = false;
  game!: Game;
  calculatedOffset: number = 0;

  subscribedGame?: Object;

  constructor(private route: ActivatedRoute, private firestore: FirebaseService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.subscribedGame = this.firestore.getGames(params['id']).subscribe((game) => {
        console.log(game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.cardDeck = game.cardDeck;
      });
    })

    this.calculatedOffset = -(this.game.cardDeck.length / 2) * 2;
  }

  ngOnDestroy() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(playernameToAdd => {
      playernameToAdd && playernameToAdd.length > 0 && this.game.players.push(playernameToAdd);

    });
  }

  newGame() {
    this.game = new Game();
  }

  drawCard() {
    if (!this.drawCardAnimation && this.game.players.length > 0) {
      this.drawCardAnimation = true;
      let currentCard = this.game.cardDeck.pop();
      if (currentCard !== undefined) {
        this.game.playedCards.push(currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer === this.game.players.length ? 0 : this.game.currentPlayer;

        setTimeout(() => {
          this.drawCardAnimation = false;
        }, 1000);
      }
    }
  }
}
