import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close({ data: this.local_data });
  }

  ngOnInit(): void {}
}
