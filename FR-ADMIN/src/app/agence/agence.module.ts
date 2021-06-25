import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgenceFormComponent } from "./agence-form/agence-form.component";
import { AgenceListComponent } from "./agence-list/agence-list.component";
import { SharedModule } from "../shared/shared.module";
import { AgenceItemComponent } from "./agence-item/agence-item.component";

@NgModule({
	declarations: [
		AgenceListComponent,
		AgenceFormComponent,
		AgenceItemComponent,
	],
	imports: [CommonModule, SharedModule],
})
export class AgenceModule {}
