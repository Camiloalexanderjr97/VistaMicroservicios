import { Component, OnInit } from '@angular/core';
import { Articulos } from 'app/Modelos/Articulos';
import { ArticuloService } from 'app/Services/articulo.service';

import { ViewChild } from "@angular/core";
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
import { subCategorias } from 'app/Modelos/SubCategorias';

@Component({
  selector: 'articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos = new Articulos();
  listarArticulos: Articulos[]=[];


    
  displayedColumns: string[] = ["id_articulo", "nombre_revista","titulo_articulo","autores_articulo","anio_articulo","mes_articulo","volumen_articulo","pagina_inical","pagina_final","issn_articulo","doi_articulo","url_articulo"];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator; 


  constructor(private articuloService: ArticuloService,private _liveAnnouncer: LiveAnnouncer) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarArticulo(): void {
    this.articuloService.getArticulos().subscribe( (data: any) => {
        
        this.listarArticulos = data ;
        console.log(data.nombre)
        console.log(this.listarArticulos)

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

  
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


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

ngOnInit() {
  this.listarArticulo();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}



mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;

mostrarAgg() {
  this.mostrarListado = false;
  this.mostrarAgregar = true;
  this.mostrarEditar = false;
  // this.listarLibreria();
}

mostrarList() {
  this.mostrarAgregar = false;
  this.mostrarListado = true;
  this.mostrarEditar = false;
  this.listarArticulo();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
}


}
