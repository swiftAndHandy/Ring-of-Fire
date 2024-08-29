import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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

  constructor(private dialogRef: MatDialogRef<AddPlayerDialogComponent>) {

  }

  onNoClick() {
    this.dialogRef.close();
  };
}
