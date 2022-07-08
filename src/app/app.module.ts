import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CargarScriptsService } from "./../cargar-scripts.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app.routing"; 
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ArticuloComponent } from "./articulo/articulo.component";

import { MaterialModule } from "./material-module";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoginComponent } from './login/login.component';
import { ExportService } from './Services/ConverterExcel/exporter.service';
// import { MatTableExporterModule } from "mat-table-exporter";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
    // ProductoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MaterialModule,
    NgbModule,
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    NgxDatatableModule,

    CommonModule,
    AppRoutingModule,
    MatProgressBarModule,

    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
  ],
  providers: [CargarScriptsService, NgbModule,ExportService],

  bootstrap: [AppComponent],
})
export class AppModule {}
