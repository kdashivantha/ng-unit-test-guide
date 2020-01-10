import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DetailcontainerComponent } from './detailcontainer/detailcontainer.component';
import { ContactComponent } from './contact/contact.component';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailcontainerComponent,
    ContactComponent,
    ContactdetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
