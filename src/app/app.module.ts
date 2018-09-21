import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FarmerComponent } from './farmer/farmer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CattleComponent } from './cattle/cattle.component';
import { RouterModule,Routes} from '@angular/router';
import { APP_BASE_HREF} from '@angular/common';
import { FarmerSrc } from './farmer/farmersrc.service';

const appRoutes:Routes = [
  { path:'', component: FarmerComponent },
  { path:'cattle', component: CattleComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    FarmerComponent,
    CattleComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
     ],
   providers: [ {provide: APP_BASE_HREF, useValue : '/' } ,FarmerSrc ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
