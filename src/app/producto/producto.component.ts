import { GrupoService } from './../Services/grupo.service';
import { ProgramaAcademico } from "./../Modelos/ProgramaAcademico";
import { ProgramaAcademicoService } from "./../Services/ProgramaAcademico.service";
import { Facultad } from "./../Modelos/Facultad";
import { FacultadService } from "./../Services/Facultad.service";
import { SubCategoriaService } from "./../Services/SubCategoria.service";
import { Producto } from "app/Modelos/Producto";
import { ProductoService } from "app/Services/producto.service";
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
import { subCategorias } from "app/Modelos/SubCategorias";
import { Grupo } from 'app/Modelos/Grupo';

declare var $;
var DataTable = require("datatables.net");

@Component({
  selector: "producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.css"],
})
export class ProductoComponent implements OnInit {
  productos = new Producto();
  productoN = new Producto();
  listarProductos: Producto[] = [];
  ListarProgramas: ProgramaAcademico[]=[];

  subCategoria = new subCategorias();
  listarSubCategorias: subCategorias[] = [];

  facultad = new Facultad();
  ListarFacultad: Facultad[] = [];
  ListarGrupos: Grupo[] = [];

  displayedColumns: string[] = [
    "id",
    "nombre",
    "cantidad",
    "subcategoria",
    "fecha",
    "grupo",
    "programa",
    "facultad",
  ];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facultadService: FacultadService,
    private subCategoriaService: SubCategoriaService,
    private productoService: ProductoService,
    private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private router: Router,
    private programaAcademicoService: ProgramaAcademicoService,
    private grupoService: GrupoService,
  ) {
    //_CargaScripts.Carga(["main3"]);
  }

  ngOnInit() {
    this.listarProducto();
    console.log(this.mostrarEditar)
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
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        for (let elemento of data) {


          this.subCategoriaService.getSubCategoriaById(elemento.subcategoria).subscribe((subcategoria: subCategorias)=>
          {
            elemento.subcategoria=subcategoria.descripcion;
          })
          this.grupoService.getGrupoById(elemento.grupo).subscribe((grupo: Grupo)=>{

            elemento.grupo = grupo.nombre;
          })


          this.programaAcademicoService
            .getProgramaAcademicoById(elemento.programa)
            .subscribe((programa: ProgramaAcademico) => {
              elemento.programa = programa.nombre;
            });

          this.facultadService.getFacultadById(elemento.facultad).subscribe(
            (facu: Facultad) => {
              elemento.facultad = facu.nombre;
            },
            (error) => console.log(error),
            () => console.log("Complete")
          );

          this.listarProductos.push(elemento);
        }
        console.log(this.listarProductos);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    );
  }

  facultadPorId(id): String {
    this.facultadService.getFacultadById(id).subscribe(
      (data: Facultad) => {
        this.facultad = data;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    );
    return this.facultad.nombre;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  crearProgramaAcademico() {
    this.productos.facultad;
    var splitted = this.productos.facultad.split("-", 1);
    this.productos.facultad = splitted[0];

    alert(
      this.productos.facultad +
        "-" +
        this.productos.id +
        "-" +
        this.productos.nombre
    );

    this.productoService.addProducto(this.productos).subscribe(
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

  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  }
  date: Date;

  editarProducto() {
    this.date = new Date(this.formatearFecha(this.productoN.fecha));

    this.productoN.fecha = this.date;
    alert(this.productoN + "---" + this.productoN.fecha);

    this.productoN.facultad;
    var splitted = this.productoN.facultad.split("-", 1);
    this.productoN.facultad = splitted[0];

    alert(
      this.productoN.facultad +
        "-" +
        this.productoN.id +
        "-" +
        this.productoN.cantidad
    );

    this.productoService.editProducto(this.productoN).subscribe(
      (data: Producto) => {
        this.productoN = data;
        console.log(data);
        Swal.fire("Register Success!", "Actualizado correctamente", "success");
        this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }

  myControlFacultad = new FormControl();
  myControlSub = new FormControl();
  // // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  // options: Facultad[] ;
  filteredOptionsSubCategoria: Observable<subCategorias[]>;
  filteredOptionsFacultad: Observable<Facultad[]>;

  //Ocultar y mostrar paneles de agregar y listar
  mostrarListado: Boolean = true;
  mostrarAgregar: Boolean = false;
  mostrarEditar: Boolean = false;

  mostrarAgg() {
    
    this.mostrarAgregar = true;
    this.mostrarListado = false;
    this.mostrarEditar = false;
    this.listarFacultades();
    this.listarSubCategoriasMostrar();
    this.listadoGrupos();
    this.listadoProgramas();
  }

  mostrarList() {
    this.mostrarListado = true;
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.listarProducto();
  }

  mostrarEdit() {
    this.mostrarEditar = true;
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.listarFacultades();
    this.listarSubCategoriasMostrar();
    this.listadoGrupos();
    this.listadoProgramas();
  }

  //Editat Programa Academico

  enviarID(id) {
    this.mostrarEdit();

    console.log(id + "_id");
    this.productoService.getProductoByID(id).subscribe(
      (data: Producto) => {

        this.productoN = data;
        console.log(this.productoN);
      },
      (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }

  //Listar subCategorias para agregar en el list
  listarSubCategoriasMostrar() {
    this.subCategoriaService
      .getSubCategorias()
      .subscribe((data: subCategorias[]) => {
        this.listarSubCategorias = data;
        console.log(this.listarSubCategorias);
      });

    this.filteredOptionsSubCategoria = this.myControlSub.valueChanges.pipe(
      startWith(""),
      map((descripcion) => {
        return this.listarSubCategorias.filter((options) => options.descripcion);
      })
    );
  }

  //Listar Facultades para agregar en el list
  listarFacultades() {
    this.facultadService.getFacultad().subscribe((data: Facultad[]) => {
      this.ListarFacultad = data;
      console.log(this.ListarFacultad);
    });

    this.filteredOptionsFacultad = this.myControlFacultad.valueChanges.pipe(
      startWith(""),
      map((nombre) => {
        return this.ListarFacultad.filter((option) => option.nombre);
      })
    );
  }


  listadoGrupos(){
    this.grupoService.getGrupo().subscribe((data: Grupo[])=>{
      this.ListarGrupos=data;
    })
  }
  
  listadoProgramas(){
    this.programaAcademicoService.getProgramasAcademicos().subscribe((data: ProgramaAcademico[])=>{
      this.ListarProgramas=data;
    })
  }
}
