import { Component, OnInit } from '@angular/core';
import { Operator } from '../../model/operator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../service/operator.service';

@Component({
	selector: 'app-operator-form',
	templateUrl: './operator-form.component.html',
	styleUrls: ['./operator-form.component.css'],
})
export class OperatorFormComponent implements OnInit {
	operator: Operator;
	operators: Operator[];
	operatorForm = new FormGroup({
		nom: new FormControl('', Validators.required),
		logo: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.email, Validators.required]),
	});

	get logo() {
		return this.operatorForm.get('logo');
	}

	get nom() {
		return this.operatorForm.get('nom');
	}

	get email() {
		return this.operatorForm.get('email');
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private operatorService: OperatorService
	) {}

	ngOnInit(): void {}

	onSubmit() {
		this.operator = this.operatorForm.value;
		console.log(this.operator);
		this.operatorService
			.save(this.operator)
			.subscribe((result) => this.goToOperatorList());
	}

	goToOperatorList() {
		this.router.navigate(['/operator/all']);
	}

	reset() {
		this.operatorForm.reset();
	}
}
