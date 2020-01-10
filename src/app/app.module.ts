import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { IncrementComponent } from './increment/increment.component';
import { IncrementWithServiceComponent } from './increment-with-service/increment-with-service.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactdetailComponent,
    IncrementComponent,
    IncrementWithServiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
