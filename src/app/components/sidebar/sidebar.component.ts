import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Usuarios',  icon:'format_list_bulleted', class: '' },
    { path: '/LibrosComponent', title: 'libros',  icon:'local_library', class: '' },
    
    { path: '/ProductoComponent', title: 'productos',  icon:'content_paste', class: '' },
    { path: '/ArticuloComponent', title: 'Articulos',  icon:'content_paste', class: '' },

    // { path: '/Facultad', title: 'Facultad',  icon:'content_paste', class: '' },
    { path: '/ProgramasAcademicosComponent', title: 'Programas Academicos',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Facultad',  icon:'pages', class: '' },
    
    { path: '/SemilleroComponent', title: 'Semilleros',  icon:'content_paste', class: '' },
    { path: '/GrupoComponent', title: 'Grupos',  icon:'content_paste', class: '' },
    { path: '/DepartamentoComponent', title: 'Departamentos',  icon:'content_paste', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}