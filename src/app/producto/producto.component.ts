import { element } from 'protractor';
import { TokenService } from 'app/Services/JWT/token.service';
import { GrupoService } from '../Services/grupo.service';
import { ProgramaAcademico } from "../Modelos/ProgramaAcademico";
import { ProgramaAcademicoService } from "../Services/ProgramaAcademico.service";
import { Facultad } from "../Modelos/Facultad";
import { FacultadService } from "../Services/Facultad.service";
import { SubCategoriaService } from "../Services/SubCategoria.service";
import { Producto } from "app/Modelos/Producto";
import { ProductoService } from "app/Services/producto.service";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { CargarScriptsService } from "cargar-scripts.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { subCategorias } from "app/Modelos/SubCategorias";
import { Grupo } from 'app/Modelos/Grupo';
import * as XLSX from 'xlsx';
// import { single } from './data';

interface productoNuevo {
  name: any;
  value: any;
}

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
  ListarProgramas: ProgramaAcademico[] = [];

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
  filtroProducto: any;


  multi: any[];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria de Productos';
  showYAxisLabel = true;
  yAxisLabel;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  proNuevo: productoNuevo;
  constructor(
    private fb: FormBuilder,
    private facultadService: FacultadService,
    private subCategoriaService: SubCategoriaService,
    private productoService: ProductoService,
    private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private router: Router,
    private programaAcademicoService: ProgramaAcademicoService,
    private grupoService: GrupoService,
    private tokenService: TokenService
  ) {
    // Object.assign(this, { single })

    this.filtroProducto = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
    })
    //_CargaScripts.Carga(["main3"]);
  }
  onSelect(event) {
    console.log(event);
  }






  isLogged = false;

  soloAdmin = false;
  ngOnInit() {

    const rol = sessionStorage.getItem("rol_");
    if (rol === 'ROLE_ADMIN') {
      this.soloAdmin = true;

    } else {
      this.soloAdmin = false;
    }
    if (this.tokenService.getToken()) {
      this.isLogged = true;

      this.listarProducto();
    } else {
      this.isLogged = false;


      this.router.navigate(['/login']);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No tienes Acceso',
        showConfirmButton: false,
        timer: 1500
      })
    }
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


          this.subCategoriaService.getSubCategoriaById(elemento.subcategoria).subscribe((subcategoria: subCategorias) => {
            elemento.subcategoria = subcategoria.descripcion;
          })
          this.grupoService.getGrupoById(elemento.grupo).subscribe((grupo: Grupo) => {

            elemento.grupo = grupo.nombre;
          })


          this.programaAcademicoService.getProgramaAcademicoById(elemento.programa).subscribe((programa: ProgramaAcademico) => {
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

  filtrarPro() {
    const x = (event.target as HTMLInputElement).value;
    const fechaIni = this.formatearFecha(this.filtroProducto.value.StartDate);
    const fechaFin = this.formatearFecha(this.filtroProducto.value.EndDate);
    console.log(fechaIni + "-------Fecha Inicio" + this.filtroProducto.value.StartDate);
    console.log(fechaFin + "-------Fecha FIn");
    const data: Producto[] = [];
    for (let element of this.listarProductos) {

      console.log(new Date(element.fecha).getTime())
      if ((new Date(element.fecha).getTime() >= new Date(fechaIni).getTime()) && (new Date(element.fecha).getTime() <= new Date(fechaFin).getTime())) {
        data.push(element);

      }
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  vaciarFiltro() {
    this.filtroProducto.reset();
    this.listarProducto();
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

    return `${year}-${month}-${day}`;
  }
  date: Date;

  editarProducto() {
    this.date = new Date(this.productoN.fecha);

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
  mostrarAgregarIndividual: Boolean = false;
  mostrarAgregarMasivo: Boolean = false;
  mostrarEstadistica: Boolean = false;


  mostrarAgg() {

    this.listarFacultades();
    this.listarSubCategoriasMostrar();
    this.listadoGrupos();
    this.listadoProgramas();
    Swal.fire({
      title: 'Como le gustaría crear el Libro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Individual',
      denyButtonText: `Masivo`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.mostrarAgregar = true;

        this.mostrarListado = false;
        this.mostrarEditar = false;
        this.mostrarIndi();
      } else if (result.isDenied) {
        this.mostrarAgregar = true;


        this.mostrarListado = false;
        this.mostrarEditar = false;

        this.mostrarMas();
      }
    })
  }




  mostrarList() {
    this.mostrarListado = true;
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.mostrarEstadistica = false;
    this.listarProducto();
  }

  mostrarEdit() {
    this.mostrarEditar = true;
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.mostrarEstadistica = false;

    this.listarFacultades();
    this.listarSubCategoriasMostrar();
    this.listadoGrupos();
    this.listadoProgramas();
  }

  estadisticas() {
    this.mostrarEstadistica = true;
    this.mostrarListado = false;
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.listarFacultades();
  }

  mostrarMas() {

    this.mostrarAgregarMasivo = true;
    this.mostrarAgregarIndividual = false;
  }

  mostrarIndi() {
    this.mostrarAgregarIndividual = true;
    this.mostrarAgregarMasivo = false;

  }


  //Editat Programa Academico

  enviarID(id) {
    this.mostrarEdit();

    this.productoService.getProductoByID(id).subscribe(
      (data: Producto) => {

        this.productoN = data;
        console.log(this.productoN);
      },
      (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }

  enviarID_Eliminar(id) {

    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.productoService.deleteProducto(id).subscribe();


      } else if (result.isDenied) {
        Swal.fire('Product are not deleted', '', 'info')

      }
      this.mostrarList();
    })

  }
  //Listar subCategorias para agregar en el list
  listarSubCategoriasMostrar() {
    this.subCategoriaService.getSubCategorias().subscribe((data: subCategorias[]) => {
      this.listarSubCategorias = data;
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


  listadoGrupos() {
    this.grupoService.getGrupo().subscribe((data: Grupo[]) => {
      this.ListarGrupos = data;
    })
  }

  listadoProgramas() {
    this.programaAcademicoService.getProgramasAcademicos().subscribe((data: ProgramaAcademico[]) => {
      this.ListarProgramas = data;
    })
  }


  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: String = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];



      wb.SheetNames.forEach(sheet => {
        this.listarProductos = (XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
        // this.convertedJson =JSON.stringify((XLSX.utils.sheet_to_json(wb.Sheets[sheet])),undefined,4);
        console.log(this.listarProductos);

        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.productoService.agregarListado(this.listarProductos).subscribe(
              (data: any) => {
                this.listarProductos = data;
                console.log(data);
                Swal.fire("Register Success!", "Registrado correctamente", "success");
                this.mostrarList();
              },
              (error) =>
                Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
              () => console.log("Complete")
            );
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            this.mostrarList();
          }
        })




      })
    };
    reader.readAsBinaryString(target.files[0]);

  }


  inicio = new FormControl(new Date().toISOString());
  fin = new FormControl(new Date().toISOString());

  datos: Producto[] = [];
  pros: productoNuevo[] = [];
  nuevo: productoNuevo[] = []
  program:String='';
  guardarPrograma(dato: any){
    this.program=dato.target.value;
    console.log(this.program)
  }
  filtrarEstadistica() {
    this.pros=[];
    this.nuevo=[];
    console.log(this.program);

    for (let element of this.listarProductos) {
      if ((new Date(element.fecha).getTime() >= new Date(this.inicio.value).getTime()) && (new Date(element.fecha).getTime() <= new Date(this.fin.value).getTime()) && element.programa==this.program) {
        this.datos.push(element);


      }
    }

    this.yAxisLabel=this.formatearFecha(new Date(this.inicio.value))+ "  -  "+this.formatearFecha(new Date(this.fin.value));

    this.subCategoriaService.getSubCategorias().subscribe((data: subCategorias[]) => {

      this.listarSubCategorias = data;

      for (let categorias of this.listarSubCategorias) {
       var cont:number;
          cont=0;
        for (let element of this.datos) {
          if (element.subcategoria === categorias.descripcion) {
           cont++;
  
          }
          
  
        }
        console.log(cont);
        const a = { name: categorias.descripcion, value: cont }
        this.pros.push(a);
  
  
       
      } 
      
  
      
    

    this.nuevo = this.pros;

    console.log(this.pros);

    });


  


  }

vaciar(){
  this.pros=[];
    this.nuevo=[];

}
listaPro:ProgramaAcademico[]=[];
mostrar(dato: any){
  this.listaPro=[];
  const fac =dato.target.value;
  this.programaAcademicoService.getProgramasAcademicos().subscribe((data: ProgramaAcademico[]) => {

    for(let element of data){
      const id =element.idFacultad.id;

      if(id==fac){

        this.listaPro.push(element);
      }
    }
  });
}

}
