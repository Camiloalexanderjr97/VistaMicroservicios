import { Libros } from './../Modelos/Libros';
import { LibrosService } from '../Services/Libros.service';
// import { Libros } from '../Modelos/Libros';
import { Facultad } from './../Modelos/Facultad';
import { FacultadService } from './../Services/Facultad.service';
import { SubCategoriaService } from './../Services/SubCategoria.service';
// import { libro } from 'app/Modelos/libro';
// import { libroService } from 'app/Services/libro.service';
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
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
import { subCategorias } from 'app/Modelos/SubCategorias';

@Component({
  selector: 'libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {




  libros = new Libros();
  listarLibreria: Libros[]=[];



  
  displayedColumns: string[] = ["id_libro", "titulo_libro","numero_capitulos_libro","autores_libro","fecha_publicacion_libro","lugar_publicacion_libro","certificado_creditos_libro","certificado_investigacion_libro","editorial_libro","isbn_libro"];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private libroService: LibrosService,private _liveAnnouncer: LiveAnnouncer,) {
    //_CargaScripts.Carga(["main3"]);
  }
  


ngOnInit() {
  this.listarLibreriaLibros();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

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

  listarLibreriaLibros(): void {
    this.libroService.getLibreria().subscribe( (data: Libros[]) => {
        
        this.listarLibreria = data ;
       
        console.log(this.listarLibreria);
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


  
  crearLibro() {

    // this.Libros.facultad;
    // var splitted = this.libros.facultad.split("-", 1); 
    // this.libros.facultad=splitted[0];


    alert(
      this.libros.id_libro +
        "-" +
        this.libros.autores_libro +
        "-" +
        this.libros.titulo_libro
    );

    this.libroService
      .addLibros(this.libros)
      .subscribe(
        (data: Libros) => {
          this.libros = data;
          console.log(data);
          Swal.fire("Register Success!", "Registrado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }

  editarLibro() {

    // this.libros.facultad;
    // var splitted = this.libros.facultad.split("-", 1); 
    // this.libros.facultad=splitted[0];


    // alert(
    //   this.libros.facultad +
    //     "-" +
    //     this.libros.id +
    //     "-" +
    //     this.libros.nombre
    // );

    this.libroService
      .editLibros(this.libros)
      .subscribe(
        (data: Libros) => {
          this.libros = data;
          console.log(data);
          Swal.fire("Register Success!", "Actualizado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }

  
  // myControl = new FormControl();
  // // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  // options: Facultad[] ;
  // filteredOptionsSubCategoria: Observable<Libros[]>;
  // filteredOptionsFacultad: Observable<Facultad[]>;



  

//Ocultar y mostrar paneles de agregar y listar
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
  this.listarLibreriaLibros();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
}



//Editar Libro

enviarID(id){
  // this.mostrarEdit();

  console.log(id+"_id")
  this.libroService.getLibrosById(id).subscribe(
    (data: Libros) => {
      this.libros = new Libros();
      
      this.libros=data;
      console.log(data);
      alert(data.id_libro);
    },
    (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete")
  );

}



}


