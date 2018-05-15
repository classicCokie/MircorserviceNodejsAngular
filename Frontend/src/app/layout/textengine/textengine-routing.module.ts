import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextengineComponent } from './textengine.component';

const routes: Routes = [
    {
        path: '', component: TextengineComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TextengineRoutingModule { }
