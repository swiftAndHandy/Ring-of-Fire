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

  game!: Game;
  subscribedGame?: Object;

  constructor(private route: ActivatedRoute, private firestore: FirebaseService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.subscribedGame = this.firestore.getGames(params['id']).subscribe((game) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.cardDeck = game.cardDeck;
        this.game.session = params['id'];
        this.game.drawCardAnimation = game.drawCardAnimation;
      });
    })

    this.game.calculatedOffset = -(this.game.cardDeck.length / 2) * 2;
  }

  ngOnDestroy() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(playernameToAdd => {
      if (playernameToAdd && playernameToAdd.length > 0) {
        this.game.players.push(playernameToAdd);
        this.firestore.updateGame(this.game, this.game.session);
      }

    });
  }

  newGame() {
    this.game = new Game();
  }

  drawCard() {
    if (!this.game.drawCardAnimation && this.game.players.length > 0) {
      this.game.drawCardAnimation = true;
      let currentCard = this.game.cardDeck.pop();
      if (currentCard !== undefined) {
        this.game.playedCards.push(currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer === this.game.players.length ? 0 : this.game.currentPlayer;
        this.firestore.updateGame(this.game, this.game.session);
        setTimeout(() => {
          this.game.drawCardAnimation = false;
          this.firestore.updateGame(this.game, this.game.session);
        }, 1000);
      }
    }
  }
}
