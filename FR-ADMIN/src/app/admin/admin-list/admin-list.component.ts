import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { Admin } from "../model/admin.model";
import { AdminService } from "../service/admin.service";

@Component({
	selector: "app-admin-list",
	templateUrl: "./admin-list.component.html",
	styleUrls: ["./admin-list.component.css"],
})
export class AdminListComponent implements OnInit {
	admins: Admin[] = [];

	dataSource = new MatTableDataSource<Admin>(this.admins);
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	displayedColumns: string[] = [
		"id",
		"username",
		"nom",
		"prenom",
		"email",
		"cin",
		"adresse",
		"telephone",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
	constructor(private adminService: AdminService, public dialog: MatDialog) {}

	deleteAdmin(id: number) {
		this.adminService.delete(id).subscribe(
			(data) => {
				this.adminService.getAll().subscribe(
					(data) => {
						this.admins = data;
						this.dataSource = new MatTableDataSource<Admin>(
							this.admins
						);
					},
					(error) => {
						this.dataSource = new MatTableDataSource<Admin>([]);
					}
				);
			},
			(error) => console.log(error)
		);
	}

	ngOnInit(): void {
		this.adminService.getAll().subscribe(
			(data) => {
				this.admins = data;
				this.dataSource = new MatTableDataSource<Admin>(this.admins);
			},
			(error) => {
				this.dataSource = new MatTableDataSource<Admin>([]);
			}
		);

		this.dataSource.paginator = this.paginator;
	}
	openDialog(code: string): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: "350px",
			data: {
				message: "Voulez vous supprimer l'admin " + code + "?",
				codeSupp: code,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.deleteAdmin(result.data.codeSupp);
			}
		});
	}
}
