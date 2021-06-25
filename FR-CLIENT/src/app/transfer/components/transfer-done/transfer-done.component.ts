import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-done',
  templateUrl: './transfer-done.component.html',
  styleUrls: ['./transfer-done.component.css'],
})
export class TransferDoneComponent implements OnInit {
  codeId: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.codeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {}
  goToTransfers() {
    this.router.navigate(['/compte/' + this.codeId + '/virements']);
  }
}
