import { ArticuloComponent } from './../../articulo/articulo.component';
import { GrupoComponent } from './../../grupo/grupo.component';
import { DepartamentoComponent } from './../../departamento/departamento.component';
import { SemilleroComponent } from './../../semillero/semillero.component';
import { ProgramasAcademicosComponent } from 'app/programas-academicos/programas-academicos.component';
// import { ProgramasAcademicosComponent } from './../../components/programas-academicos/programas-academicos.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from 'app/typographys/typography.component';
import { LibrosComponent } from './../../libros/libros.component';
import { RegisterComponent } from 'app/register/register.component';
import { ProductoComponent } from 'app/producto/producto.component';


// import { TypographyComponent } from '../../typographys/typography.component';
// import { ProgramasAcademicosComponent } from 'app/programas-academicos';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    ProgramasAcademicosComponent,
    TypographyComponent,
    LibrosComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    RegisterComponent,
    ProductoComponent,
    SemilleroComponent,
    DepartamentoComponent,
    GrupoComponent,
    ArticuloComponent
    
  ]
})

export class AdminLayoutModule {}
