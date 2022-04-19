import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {CalendarModule} from 'primeng/calendar';
import {GoogleChartsModule} from 'angular-google-charts';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import {ChipsModule} from 'primeng/chips';
import {PanelModule} from 'primeng/panel';
import {NgxLoadingModule} from 'ngx-loading';
import {FooterModule} from '../shared-components/footer/footer.module';

@NgModule({
    declarations: [],
    exports:[
        CommonModule,
        FileUploadModule,
        ProgressSpinnerModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        FieldsetModule,
        CalendarModule,
        MultiSelectModule,
        InputSwitchModule,
        GoogleChartsModule,
        RadioButtonModule,
        DropdownModule,
        TableModule,
        DialogModule,
        TabViewModule,
        ChipsModule,
        PanelModule,
        NgxLoadingModule,
        FooterModule
    ]
})

export class SharedModule { }
