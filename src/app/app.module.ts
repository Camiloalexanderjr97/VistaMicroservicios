import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { Router } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from 'app/typographys/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
// import { UpgradeComponent } from './upgrade/upgrade.component';
import { LibrosComponent } from './libros/libros.component';
import { ProgramasAcademicosComponent } from 'app/programas-academicos/programas-academicos.component';
import { RegisterComponent } from './register/register.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { GrupoComponent } from './grupo/grupo.component';
import { SemilleroComponent } from './semillero/semillero.component';
import { DepartamentoComponent } from './departamento/departamento.component';
// import { ProductoComponent } from './producto/producto.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './material-module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule,

    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
    // ProductoComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
