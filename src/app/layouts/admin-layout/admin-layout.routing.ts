import { FacultadsComponent } from './../../facultads/facultads.component';
import { ArticuloComponent } from './../../articulo/articulo.component';
import { SemilleroComponent } from './../../semillero/semillero.component';
import { Component } from '@angular/core';
import { LibrosComponent } from './../../libros/libros.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from 'app/register/register.component';
import { ProductoComponent } from 'app/producto/producto.component';


import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
// import { facultadComponent } from 'app/Facultad/facultad.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProgramasAcademicosComponent } from 'app/programas-academicos/programas-academicos.component';
import { GrupoComponent } from 'app/grupo/grupo.component';
import { DepartamentoComponent } from 'app/departamento/departamento.component';
// import { LibrosComponent } from 'app/libros/libros.component';

// import { ProgramasAcademicosComponent}

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'facultad',     component: FacultadsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'ProgramasAcademicosComponent',        component: ProgramasAcademicosComponent },
    { path: 'LibrosComponent', component: LibrosComponent},
    { path: 'RegisterComponent', component: RegisterComponent},
    { path: 'ArticuloComponent', component: ArticuloComponent},
    { path: 'ProductoComponent', component: ProductoComponent},
    { path: 'SemilleroComponent', component: SemilleroComponent},
    { path: 'GrupoComponent', component: GrupoComponent},
    { path: 'DepartamentoComponent', component: DepartamentoComponent}
    
];
