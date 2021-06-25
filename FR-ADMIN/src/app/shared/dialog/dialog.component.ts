import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
	local_data: any;
	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
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
