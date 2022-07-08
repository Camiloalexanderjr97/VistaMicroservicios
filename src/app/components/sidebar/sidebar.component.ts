import { TokenService } from 'app/Services/JWT/token.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESAdmin: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Usuarios',  icon:'format_list_bulleted', class: '' },
    // { path: '/LibrosComponent', title: 'libros',  icon:'local_library', class: '' },
    
    { path: '/ProductoComponent', title: 'productos',  icon:'business', class: '' },
    // { path: '/ArticuloComponent', title: 'Articulos',  icon:'content_paste', class: '' },

    // { path: '/Facultad', title: 'Facultad',  icon:'content_paste', class: '' },
    { path: '/ProgramasAcademicosComponent', title: 'Programas Academicos',  icon:'content_paste', class: '' },
    { path: '/facultad', title: 'Facultad',  icon:'pages', class: '' },
    
    // { path: '/SemilleroComponent', title: 'Semilleros',  icon:'brightness_auto', class: '' },
    { path: '/GrupoComponent', title: 'Grupos',  icon:'collections_bookmark', class: '' },
    { path: '/DepartamentoComponent', title: 'Departamentos',  icon:'description', class: '' }
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

export const ROUTESUser: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/LibrosComponent', title: 'libros',  icon:'local_library', class: '' },
    
    { path: '/ProductoComponent', title: 'productos',  icon:'content_paste', class: '' },
    // { path: '/ArticuloComponent', title: 'Articulos',  icon:'content_paste', class: '' },

    // { path: '/SemilleroComponent', title: 'Semilleros',  icon:'content_paste', class: '' },
    // // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private tokenService: TokenService) { }



  ngOnInit() {
    const roles = sessionStorage.getItem("rol_");
    if(roles==='ROLE_ADMIN'){

    this.menuItems = ROUTESAdmin.filter(menuItem => menuItem);
    }else{
      this.menuItems = ROUTESUser.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
