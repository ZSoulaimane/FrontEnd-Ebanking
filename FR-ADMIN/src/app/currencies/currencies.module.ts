import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { CurrencyListComponent } from "./currency-list/currency-list.component";
import { CurrencyItemComponent } from './currency-item/currency-item.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';

@NgModule({
	declarations: [CurrencyListComponent, CurrencyItemComponent, CurrencyFormComponent],
	imports: [CommonModule, SharedModule],
})
export class CurrenciesModule {}
