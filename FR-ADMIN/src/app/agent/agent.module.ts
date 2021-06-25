import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AgentFormComponent } from "./agent-form/agent-form.component";
import { AgentListComponent } from "./agent-list/agent-list.component";
import { AgentItemComponent } from './agent-item/agent-item.component';

@NgModule({
	declarations: [AgentFormComponent, AgentListComponent, AgentItemComponent],
	imports: [CommonModule, SharedModule],
})
export class AgentModule {}
