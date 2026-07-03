import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerInfoComponent } from './components/owner-info/owner-info.component';

@NgModule({
    imports: [
        CommonModule,
        OwnerInfoComponent
    ],
    exports: [
        OwnerInfoComponent
    ],
})
export class SharedModule { }
