import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { SharedModule } from "../shared/shared.module";
import { AdminFormComponent } from "./admin-form/admin-form.component";

@NgModule({
	declarations: [AdminListComponent, AdminFormComponent],
	imports: [CommonModule, SharedModule],
})
export class AdminModule {}
