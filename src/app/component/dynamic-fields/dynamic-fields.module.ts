import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldsComponent } from './dynamic-fields.component';
import {DynamicFieldsRoutingModule} from './dynamic-fields-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";



@NgModule({
  declarations: [DynamicFieldsComponent],
  imports: [
    CommonModule,
    DynamicFieldsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class DynamicFieldsModule { }
