import { OperatorService } from './../../service/operator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/operation/model/operation';
import { OperationService } from 'src/app/operation/service/operation.service';

@Component({
	selector: 'app-operator-operation-list',
	templateUrl: './operator-operation-list.component.html',
	styleUrls: ['./operator-operation-list.component.css'],
})
export class OperatorOperationListComponent implements OnInit {
	OPERATIONS: Operation[] = [];
	idOperateur: string;

	dataSource = new MatTableDataSource<Operation>(this.OPERATIONS);

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	displayedColumns: string[] = ['id', 'sommeEspece', 'sommeCompte', 'type'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(
		private OperatorService: OperatorService,
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private router: Router
	) {
		this.idOperateur = this.route.snapshot.params.id;
	}

	ngOnInit(): void {
		this.OperatorService.getOperation(this.idOperateur).subscribe(
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

	goToOperatorList() {
		this.router.navigate(['/operator/all']);
	}
}
