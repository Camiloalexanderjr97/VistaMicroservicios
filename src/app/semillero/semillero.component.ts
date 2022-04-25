import { SemilleroService } from './../Services/semillero.service';
import { Semillero } from 'app/Modelos/Semillero';
import { FacultadService } from './../Services/Facultad.service';
import { Facultad } from '../Modelos/Facultad';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { CargarScriptsService } from "cargar-scripts.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'semillero',
  templateUrl: './semillero.component.html',
  styleUrls: ['./semillero.component.css']
})
export class SemilleroComponent implements OnInit {

  Semilleros = new Semillero();
  listarSemilleros: Semillero[]=[];
 

    
  displayedColumns: string[] = ["id", "nombre", "canGrupos", "fechaConformacion"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

 
  constructor(private SemilleroService: SemilleroService,  private _liveAnnouncer: LiveAnnouncer) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarSemillero(): void {
    this.SemilleroService.getSemillero().subscribe( (data: any) => {
        
        this.listarSemilleros = data ;
        console.log(data.nombre)
        console.log(this.listarSemilleros)

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce("Sorting cleared");
      }
    }
  



 
    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }
  

    myControl = new FormControl();
    // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
    options: Facultad[] ;
    filteredOptions: Observable<Facultad[]>;
    
    
    

//Ocultar y mostrar paneles de agregar y listar
mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;

mostrarAgg() {
  this.mostrarListado = false;
  this.mostrarAgregar = true;
  this.mostrarEditar = false;
  this.listarSemillero();
}

mostrarList() {
  this.mostrarAgregar = false;
  this.mostrarListado = true;
  this.mostrarEditar = false;
  this.listarSemillero();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
  this.listarSemillero();
}



ngOnInit() {
  this.listarSemillero();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
