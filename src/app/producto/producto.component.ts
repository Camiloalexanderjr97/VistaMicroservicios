import { Facultad } from './../Modelos/Facultad';
import { FacultadService } from './../Services/Facultad.service';
import { SubCategoriaService } from './../Services/SubCategoria.service';
import { Producto } from 'app/Modelos/Producto';
import { ProductoService } from 'app/Services/producto.service';
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

declare var $;
var DataTable = require("datatables.net");


@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos = new Producto();
  listarProductos: Producto[]=[];

  subCategoria = new subCategorias();
  listarSubCategorias: subCategorias[]=[];

  
  facultad = new Facultad();
  ListarFacultad: Facultad[]=[];


  displayedColumns: string[] = ["id", "nombre","cantidad","subcategoria","fecha","grupo","programa","facultad"];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private FacultadService: FacultadService,private subCategoriaService: SubCategoriaService,private productoService: ProductoService,   private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private router: Router,
    icon: MatIconModule,
  ) {
    //_CargaScripts.Carga(["main3"]);
  }
  

  ngOnInit() {
    this.listarProducto();
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


  listarProducto(): void {
    this.productoService.getProductos().subscribe( (data: Producto[]) => {
        
        this.listarProductos = data ;
        
        console.log(this.listarProductos);
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


  
  crearProgramaAcademico() {

    this.productos.facultad;
    var splitted = this.productos.facultad.split("-", 1); 
    this.productos.facultad=splitted[0];


    alert(
      this.productos.facultad +
        "-" +
        this.productos.id +
        "-" +
        this.productos.nombre
    );

    this.productoService
      .addProducto(this.productos)
      .subscribe(
        (data: Producto) => {
          this.productos = data;
          console.log(data);
          Swal.fire("Register Success!", "Registrado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }

  
  editarProgramaAcademico() {

    this.productos.facultad;
    var splitted = this.productos.facultad.split("-", 1); 
    this.productos.facultad=splitted[0];


    alert(
      this.productos.facultad +
        "-" +
        this.productos.id +
        "-" +
        this.productos.nombre
    );

    this.productoService
      .editProducto(this.productos)
      .subscribe(
        (data: Producto) => {
          this.productos = data;
          console.log(data);
          Swal.fire("Register Success!", "Actualizado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }


  

  myControl = new FormControl();
  // // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  // options: Facultad[] ;
  filteredOptionsSubCategoria: Observable<subCategorias[]>;
  filteredOptionsFacultad: Observable<Facultad[]>;






//Ocultar y mostrar paneles de agregar y listar
mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;

mostrarAgg() {
  this.mostrarListado = false;
  this.mostrarAgregar = true;
  this.mostrarEditar = false;
  this.listarFacultades();
}

mostrarList() {
  this.mostrarAgregar = false;
  this.mostrarListado = true;
  this.mostrarEditar = false;
  this.listarProducto();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
}



//Editat Programa Academico

enviarID(id){
  // this.mostrarEdit();

  console.log(id+"_id")
  this.productoService.getProductoByID(id).subscribe(
    (data: Producto) => {
      this.productos = new Producto();
      
      this.productos=data;
      console.log(data);
      alert(data.id);
    },
    (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete")
  );

}








//Listar subCategorias para agregar en el list 
listarSubCategoriasMostrar() {
 
    

  this.subCategoriaService.getSubCategorias().subscribe((data: subCategorias[]) => {
    this.listarSubCategorias = data;
    console.log(this.listarSubCategorias);
  });


  this.filteredOptionsSubCategoria = this.myControl.valueChanges.pipe(
    startWith(''),
    map(descipcion => {
      return this.listarSubCategorias.filter((option) =>
      
      option.descripcion
      );
    })
  );
}





//Listar Facultades para agregar en el list 
listarFacultades() {

    

  this.FacultadService.getFacultad().subscribe((data: Facultad[]) => {
    this.ListarFacultad = data;
    console.log(this.ListarFacultad);
  });


  this.filteredOptionsFacultad = this.myControl.valueChanges.pipe(
    startWith(''),
    map(nombre => {
      return this.ListarFacultad.filter((option) =>
      
      option.nombre
      );
    })
  );
}











}
