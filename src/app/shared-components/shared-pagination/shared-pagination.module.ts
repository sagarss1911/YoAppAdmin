import { NgModule } from "@angular/core";
import { SharedPaginationComponent } from  "./shared-pagination.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule,FormsModule],
    declarations: [SharedPaginationComponent],
    exports: [SharedPaginationComponent]
})
export class SharedPaginationModule { }