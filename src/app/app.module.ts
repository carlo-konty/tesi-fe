import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InformationSchemaComponent } from './information-schema/information-schema.component';
import { InformationSchemaService } from 'src/_service/information-schema.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MigrationService } from 'src/_service/migration-service.service';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationSchemaComponent,
    ToastComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    InformationSchemaService,
    MigrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
