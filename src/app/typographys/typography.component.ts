import { FacultadService } from '../Services/Facultad.service';
import { Facultad } from '../Modelos/Facultad';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
// import  {  SweetAlert2Module  }  from  '@sweetalert2/ngx-sweetalert2' ;
import { NgModule } from '@angular/core';
// import { CargarScriptsService } from "../cargar-scripts.service";
// import Swal from 'sweetalert2';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  Facultad = new Facultad();
  ListarFacultad: Facultad[]=[];
  
    constructor(private facultadService: FacultadService) {
      //_CargaScripts.Carga(["main3"]);
    }
     listarFacultades(){
      this.facultadService.getFacultad().subscribe((data: any) => {
        this.ListarFacultad = data;
        console.log(this.ListarFacultad);
      });
    }

    
ngOnInit() {
  this.listarFacultades();
}

}
