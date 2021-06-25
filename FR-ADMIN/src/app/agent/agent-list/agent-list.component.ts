import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AgentService } from "../service/agent.service";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { Agent } from "../model/agent.model";

@Component({
	selector: "app-agent-list",
	templateUrl: "./agent-list.component.html",
	styleUrls: ["./agent-list.component.css"],
})
export class AgentListComponent implements OnInit {
	agents: Agent[] = [];
	agenceId: number | any;
	dataSource = new MatTableDataSource<Agent>(this.agents);
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	displayedColumns: string[] = [
		"username",
		"nom",
		"prenom",
		"email",
		"cin",
		"adresse",
		"telephone",
		"agence",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
	constructor(
		private agentService: AgentService,
		private router: ActivatedRoute,
		public dialog: MatDialog,
		private route: Router
	) {}

	ngOnInit(): void {
		this.agenceId = this.router.snapshot.params["id"];
		this.agentService.findAllAgents(this.agenceId).subscribe(
			(data) => {
				this.agents = data;
				this.dataSource = new MatTableDataSource<Agent>(this.agents);
			},
			(error) => {
				this.dataSource = new MatTableDataSource<Agent>([]);
			}
		);
		this.dataSource.paginator = this.paginator;
	}

	deleteAgent(id: number) {
		this.agentService.delete(id).subscribe(
			(data) => {
				this.agentService.findAllAgents(this.agenceId).subscribe(
					(data) => {
						this.agents = data;
						this.dataSource = new MatTableDataSource<Agent>(
							this.agents
						);
						this.dataSource.paginator = this.paginator;
					},
					(error) => {
						this.dataSource = new MatTableDataSource<Agent>([]);
					}
				);
			},
			(error) => console.log(error)
		);
	}

	goToForm() {
		this.route.navigate([
			"/overview/agence/" + this.agenceId + "/agent/new",
		]);
	}

	goToAgent(agentId: string) {
		this.route.navigate([
			"/overview/agence/" + this.agenceId + "/agent/" + agentId,
		]);
	}

	openDialog(code: string): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: "350px",
			data: {
				message: "Voulez vous supprimer l'agent " + code + "?",
				codeSupp: code,
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.deleteAgent(result.data.codeSupp);
			}
		});
	}
}
