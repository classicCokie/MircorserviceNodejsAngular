import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TextengineRoutingModule } from './textengine-routing.module';
import { TextengineComponent } from './textengine.component';

import {

} from './components';

import { PageHeaderModule } from './../../shared';
import {ConditionsListComponent} from "./components/conditions_list/conditions_list.component";

@NgModule({
    imports: [
        CommonModule,
        TextengineRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
    declarations: [
        TextengineComponent,
        ConditionsListComponent,
    ]
})
export class TextengineModule {}
