import { FacultadsComponent } from './../../facultads/facultads.component';
import { ArticuloComponent } from './../../articulo/articulo.component';
import { SemilleroComponent } from './../../semillero/semillero.component';
import { Component } from '@angular/core';
import { LibrosComponent } from './../../libros/libros.component';
import { Routes } from '@angular/router';
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
import { ProdGuardService as guard } from 'guards/pro-guard.service';
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
    { path: 'dashboard',      component: DashboardComponent, canActivate: [guard], data: { expectedRol:['admin', 'user']} },
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: [guard], data: { expectedRol:['admin']} },
    { path: 'table-list',     component: TableListComponent,canActivate: [guard], data: { expectedRol:['admin']} },
    { path: 'facultad',     component: FacultadsComponent,canActivate: [guard], data: { expectedRol:['admin']} },
    // { path: 'icons',          component: IconsComponent ,canActivate: [guard], data: { expectedRol:['admin']} },
    // { path: 'maps',           component: MapsComponent ,canActivate: [guard], data: { expectedRol:['admin']} },
    // { path: 'notifications',  component: NotificationsComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'ProgramasAcademicosComponent',        component: ProgramasAcademicosComponent ,canActivate: [guard], data: { expectedRol:['admin']} },
    // { path: 'LibrosComponent', component: LibrosComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    // { path: 'ArticuloComponent', component: ArticuloComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    { path: 'ProductoComponent', component: ProductoComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    // { path: 'SemilleroComponent', component: SemilleroComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    { path: 'GrupoComponent', component: GrupoComponent,canActivate: [guard], data: { expectedRol:['admin', ]} },
    { path: 'DepartamentoComponent', component: DepartamentoComponent,canActivate: [guard], data: { expectedRol:['admin']} }
    
];
