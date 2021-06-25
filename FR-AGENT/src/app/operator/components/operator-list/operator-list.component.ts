import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Operator } from '../../model/operator';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorService } from '../../service/operator.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
	selector: 'app-operator-list',
	templateUrl: './operator-list.component.html',
	styleUrls: ['./operator-list.component.css'],
})
export class OperatorListComponent implements OnInit {
	OPERATORS: Operator[] = [];

	dataSource = new MatTableDataSource<Operator>(this.OPERATORS);

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	displayedColumns: string[] = ['id', 'nom', 'email', 'logo', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(
		private operatorService: OperatorService,
		public dialog: MatDialog,
		private router: Router
	) {}

	deleteOperator(id: number) {
		this.operatorService.delete(id).subscribe(
			(data) => {
				console.log(data);

				this.operatorService.findAll().subscribe(
					(data) => {
						this.OPERATORS = data;
						this.dataSource = new MatTableDataSource<Operator>(
							this.OPERATORS
						);
					},
					(error) => {
						this.dataSource = new MatTableDataSource<Operator>(
							null
						);
					}
				);
			},
			(error) => console.log(error)
		);
	}

	ngOnInit(): void {
		console.log('salam');
		this.operatorService.findAll().subscribe(
			(data) => {
				console.log(data);
				this.OPERATORS = data;
				this.dataSource = new MatTableDataSource<Operator>(
					this.OPERATORS
				);
				this.dataSource.paginator = this.paginator;
			},
			(error) => {
				console.log(error);
				this.dataSource = new MatTableDataSource<Operator>(null);
			}
		);
	}

	goToOperations(code: string) {
		this.router.navigate(['/operator/' + code + '/operation/all']);
	}

	goToForm() {
		this.router.navigate(['/operator/new']);
	}

	openDialog(code: string): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '350px',
			data: {
				message: 'Voulez vous supprimer le client ' + code + '?',
				codeSupp: code,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.deleteOperator(result.data.codeSupp);
			}
		});
	}
}
