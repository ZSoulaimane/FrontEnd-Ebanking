import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from '../../model/operation';
import { OperationService } from '../../service/operation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-operation-list',
	templateUrl: './operation-list.component.html',
	styleUrls: ['./operation-list.component.css'],
})
export class OperationListComponent implements OnInit {
	OPERATIONS: Operation[] = [];
	idClient: string;
	idCompte: string;

	dataSource = new MatTableDataSource<Operation>(this.OPERATIONS);

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	displayedColumns: string[] = [
		'id',
		'sommeEspece',
		'sommeCompte',
		'type',
		'actions',
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(
		private operationService: OperationService,
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private router: Router
	) {
		console.log('operationList');
		this.idClient = this.route.snapshot.params.idClient;
		this.idCompte = this.route.snapshot.params.idCompte;
		console.log(this.idClient, this.idCompte);
	}

	ngOnInit(): void {
		this.operationService.findOperations(this.idCompte).subscribe(
			(data) => {
				console.log(data);
				this.OPERATIONS = data;
				this.dataSource = new MatTableDataSource<Operation>(
					this.OPERATIONS
				);
				this.dataSource.paginator = this.paginator;
			},
			(error) => {
				console.log(error);
				this.dataSource = new MatTableDataSource<Operation>(null);
			}
		);
	}

	getPDF(invoiceId: number) {
		this.operationService.getPDF(invoiceId).subscribe(
			(data: Blob) => {
				var file = new Blob([data], { type: 'application/pdf' });
				var fileURL = URL.createObjectURL(file);

				// if you want to open PDF in new tab
				window.open(fileURL);
				var a = document.createElement('a');
				a.href = fileURL;
				a.target = '_blank';
				a.download =
					"Recu de l'operation" +
					invoiceId +
					'sur le compte' +
					this.idCompte +
					'.pdf';
				document.body.appendChild(a);
				a.click();
			},
			(error) => {
				console.log('getPDF error: ', error);
			}
		);
	}

	goToOperationForm() {
		this.router.navigate([
			'/client/' +
				this.idClient +
				'/account/' +
				this.idCompte +
				'/operation/new',
		]);
	}
	goToAccounts() {
		this.router.navigate(['/client/' + this.idClient + '/accounts']);
	}
}
