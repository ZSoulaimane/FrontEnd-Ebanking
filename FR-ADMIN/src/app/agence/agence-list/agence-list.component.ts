import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { Agence } from "../model/agence.model";
import { AgenceService } from "../services/agence.service";

@Component({
	selector: "app-agence-list",
	templateUrl: "./agence-list.component.html",
	styleUrls: ["./agence-list.component.css"],
})
export class AgenceListComponent implements OnInit {
	title: string = "Liste des agences";
	agences: Agence[] = [];
	dataSource = new MatTableDataSource<Agence>(this.agences);
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
	displayedColumns: string[] = [
		"id",
		"nom",
		"email",
		"adresse",
		"telephone",
		"actions",
	];
	constructor(
		private agenceService: AgenceService,
		public dialog: MatDialog,
		private router: Router
	) {}

	ngOnInit(): void {
		this.agenceService.getAll().subscribe(
			(data) => {
				this.agences = data;
				this.dataSource = new MatTableDataSource<Agence>(this.agences);
			},
			(error) => {
				console.warn(error);
				this.dataSource = new MatTableDataSource<Agence>([]);
			}
		);

		this.dataSource.paginator = this.paginator;
	}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	deleteAgence(id: number) {
		this.agenceService.delete(id).subscribe(
			(data) => {
				this.agenceService.getAll().subscribe(
					(data: any) => {
						this.agences = data;
						this.dataSource = new MatTableDataSource<Agence>(
							this.agences
						);
					},
					(error: any) => {
						this.dataSource = new MatTableDataSource<Agence>([]);
					}
				);
			},
			(error) => console.log(error)
		);
	}
	openDialog(code: string): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: "350px",
			data: {
				message: "Voulez vous supprimer l'agence " + code + "?",
				codeSupp: code,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.deleteAgence(result.data.codeSupp);
			}
		});
	}

	goToAgence(code: string) {
		this.router.navigate(["/overview/agence/" + code]);
	}
}
