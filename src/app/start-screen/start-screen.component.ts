import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private firestore: FirebaseService, private router: Router) {
  
  }

  newGame() {
    const game = new Game();
    this.firestore.addGame(game).then((gameDatabase) => 
    {
      this.router.navigateByUrl(`/game/${gameDatabase.id}`);
    });
  }
}
