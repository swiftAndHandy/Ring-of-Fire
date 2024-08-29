import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-add-player-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, FormsModule],
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.scss'
})
export class AddPlayerDialogComponent {
  playernameToAdd: string = '';

  onNoClick() {};
}
