import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { Currency } from "../model/currency.model";
import { CurrenciesService } from "../service/currencies.service";

@Component({
	selector: "app-currency-list",
	templateUrl: "./currency-list.component.html",
	styleUrls: ["./currency-list.component.css"],
})
export class CurrencyListComponent implements OnInit {
	currencies: Currency[] = [];
	dataSource = new MatTableDataSource<Currency>(this.currencies);
	displayedColumns: string[] = ["code", "nom", "actions"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	constructor(
		private currencyService: CurrenciesService,
		private route: Router,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.currencyService.findAll().subscribe(
			(data) => {
				this.currencies = data;
				this.dataSource = new MatTableDataSource<Currency>(
					this.currencies
				);
				this.dataSource.paginator = this.paginator;
			},
			(error) => {
				this.dataSource = new MatTableDataSource<Currency>([]);
			}
		);
	}

	goToCurrencyItem(id: string) {
		this.route.navigate(["/overview/currency/" + id]);
	}

	deleteCurrency(id: string) {
		this.currencyService.delete(id).subscribe(
			(data) => {
				this.currencyService.findAll().subscribe(
					(data) => {
						this.currencies = data;
						this.dataSource = new MatTableDataSource<Currency>(
							this.currencies
						);
					},
					(error) => {
						this.dataSource = new MatTableDataSource<Currency>([]);
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
				message: "Voulez vous supprimer la devise " + code + "?",
				codeSupp: code,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.deleteCurrency(result.data.codeSupp);
			}
		});
	}
}
