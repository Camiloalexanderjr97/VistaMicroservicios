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
import { Router } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "./table-list/table-list.component";
// import { facultadComponent } from "app/Facultad/facultad.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
// import { UpgradeComponent } from './upgrade/upgrade.component';
import { LibrosComponent } from "./libros/libros.component";
import { ProgramasAcademicosComponent } from "app/programas-academicos/programas-academicos.component";
import { RegisterComponent } from "./register/register.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ArticuloComponent } from "./articulo/articulo.component";
import { GrupoComponent } from "./grupo/grupo.component";
import { SemilleroComponent } from "./semillero/semillero.component";
import { DepartamentoComponent } from "./departamento/departamento.component";
// import { ProductoComponent } from './producto/producto.component';

import { MaterialModule } from "./material-module";
import { MatProgressBarModule } from "@angular/material/progress-bar";
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FacultadsComponent } from './facultads/facultads.component';

// import {NgbModuledule} from '@ ng-bootstrap / ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
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
  providers: [CargarScriptsService, NgbModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
