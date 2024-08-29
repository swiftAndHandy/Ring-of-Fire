import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

interface CardRule {
  title: string,
  description: string,
};


@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-description.component.html',
  styleUrl: './card-description.component.scss'
})
export class CardDescriptionComponent {
  cardAction: CardRule[] = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Touch the tabletop with your thumb. The last player to touch the table has to take a sip.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'Question master. You become the question master, and if anybody answers a question asked by you (the player who drew the card), they have to drink. This applies to ANY question.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  currentIndex: number | undefined = undefined;

  @Input() currentCard: string = '';

  ngOnChanges(): void {
    if (this.currentCard !== undefined) {
      this.currentIndex = Number(this.currentCard.split('_')[1]) - 1;
      console.log(this.currentIndex);
      
    }

  };

}
