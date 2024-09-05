import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore)
  games$: Observable<any[]> = of([]);

  constructor() { }

  getGames(id: string): Observable<any> {
    const gameDoc = doc(collection(this.firestore, 'games'), id);
    return docData(gameDoc);
  }

  async addGame(game: Game) {
    const gameAsJson = game.convertToJson();
    return await addDoc(collection(this.firestore, 'games'), gameAsJson);
  }




}
