import { TokenService } from "app/Services/JWT/token.service";
import { Libros } from "./../Modelos/Libros";
import { LibrosService } from "../Services/Libros.service";
// import { Libros } from '../Modelos/Libros';
import { Facultad } from "./../Modelos/Facultad";
import { FacultadService } from "./../Services/Facultad.service";
import { SubCategoriaService } from "./../Services/SubCategoria.service";
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
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { subCategorias } from "app/Modelos/SubCategorias";
import * as XLSX from "xlsx";
import { ExportService } from "app/Services/ConverterExcel/exporter.service";
// import {MatTableExporterModule} from 'mat-table-exporter';

interface objeto {
  name: any;
  value: any;
}
@Component({
  selector: "libros",
  templateUrl: "./libros.component.html",
  styleUrls: ["./libros.component.css"],
})
export class LibrosComponent implements OnInit {
  id_libro?: String;
  titulo_libro?: String;
  numero_capitulos_libro?: String;
  autores_libro?: String;
  fecha_publicacion_libro?: Date = new Date();
  lugar_publicacion_libro?: String;
  certificado_creditos_libro?: String;
  certificado_investigacion_libro?: String;
  editorial_libro?: String;
  isbn_libro?: String;

  libros = new Libros();
  listarLibreria: Libros[] = [];

  displayedColumns: string[] = [
    "id_libro",
    "titulo_libro",
    "numero_capitulos_libro",
    "autores_libro",
    "fecha_publicacion_libro",
    "lugar_publicacion_libro",
    "certificado_creditos_libro",
    "certificado_investigacion_libro",
    "editorial_libro",
    "isbn_libro",
  ];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filtroProducto: any;

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Categoria de Productos";
  showYAxisLabel = true;
  yAxisLabel;
  showDataLabel=true;

  colorScheme = {
    domain: [
      "#FF8A80",
      "#EA80FC",
      "#8C9EFF",
      "#80D8FF",
      "#A7FFEB",
      "#CCFF90",
      "#FFFF8D",
      "#FF9E80",
    ],
  };

  constructor(
    private exportService: ExportService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private libroService: LibrosService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    //_CargaScripts.Carga(["main3"]);

    this.filtroProducto = this.fb.group({
      StartDate: ["", Validators.required],
      EndDate: ["", Validators.required],
    });
  }

  isLogged = false;
  soloAdmin = false;
  ngOnInit() {
    const rol = sessionStorage.getItem("rol_");
    if (rol === "ROLE_ADMIN") {
      this.soloAdmin = true;
    } else {
      this.soloAdmin = false;
    }
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    if (this.tokenService.getToken()) {
      this.isLogged = true;

      this.listarLibreriaLibros();
    } else {
      this.isLogged = false;

      this.router.navigate(["/login"]);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No tienes Acceso",
        showConfirmButton: false,
        timer: 1500,
      });
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

  listarLibreriaLibros(): void {
    this.libroService.getLibreria().subscribe(
      (data: Libros[]) => {
        this.listarLibreria = data;

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  filtrarPro() {
    const x = (event.target as HTMLInputElement).value;
    const fechaIni = this.formatearFecha(this.filtroProducto.value.StartDate);
    const fechaFin = this.formatearFecha(this.filtroProducto.value.EndDate);
    const data: Libros[] = [];
    for (let element of this.listarLibreria) {
      if (
        new Date(element.fecha_publicacion_libro).getTime() >=
          new Date(fechaIni).getTime() &&
        new Date(element.fecha_publicacion_libro).getTime() <=
          new Date(fechaFin).getTime()
      ) {
        data.push(element);
      }
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  vaciarFiltro() {
    this.filtroProducto.reset();
    this.listarLibreriaLibros();
  }

  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
  crearLibros() {
    alert(this.libros.id_libro);

    this.libroService.addLibros(this.libros).subscribe(
      (data: Libros) => {
        this.libros = data;
        Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }
  libroNuevo: Libros;

  editarLibro() {
    console.log(this.id_libro);

    //  this.libroNuevo.id_libro=   this.id_libro;
     
    // console.log(this.libroNuevo.id_libro);
    //  this.libroNuevo.titulo_libro= this.titulo_libro;
    //  this.libroNuevo.numero_capitulos_libro=   this.numero_capitulos_libro;
    //  this.libroNuevo.autores_libro=    this.autores_libro;
    //  this.libroNuevo.fecha_publicacion_libro=    this.fecha_publicacion_libro;
    //  this.libroNuevo.lugar_publicacion_libro=    this.lugar_publicacion_libro;
    //  this.libroNuevo.certificado_creditos_libro=  this.certificado_creditos_libro;
    //  this.libroNuevo.certificado_investigacion_libro=    this.certificado_investigacion_libro;
    //  this.libroNuevo.editorial_libro=    this.editorial_libro;
    //  this.libroNuevo.isbn_libro=   this.isbn_libro;
  

    //  console.log(this.libroNuevo);

    // this.libroService
    //   .editLibros(this.libroNuevo).subscribe(
    //     (data: Libros) => {
    //       this.libros = data;
    //       console.log(data);
    //       Swal.fire("Edit Success!", "Actualizado correctamente", "success");
    //      this.mostrarList();
    //     },
    //     (error) =>
    //       Swal.fire("Edit Failed!", "Ha ocurrido un error", "warning"),
    //     () => console.log("Complete")
    //   );

    // this.id_libro= "";
    // this.titulo_libro = "";
    // this.numero_capitulos_libro = "";
    // this.autores_libro = "";
    // this.fecha_publicacion_libro = new Date();
    // this.lugar_publicacion_libro = "";
    // this.certificado_creditos_libro = "";
    // this.certificado_investigacion_libro = "";
    // this.editorial_libro = "";
    // this.isbn_libro = "";
  }


  //Ocultar y mostrar paneles de agregar y listar
  mostrarListado: Boolean = true;
  mostrarAgregar: Boolean = false;
  mostrarEditar: Boolean = false;
  mostrarAgregarIndividual: Boolean = false;
  mostrarAgregarMasivo: Boolean = false;
  mostrarEstadistica: Boolean = false;
  mostrarAgg() {
    Swal.fire({
      title: "Como le gustaría crear el Libro?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Individual",
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
    });
  }

  mostrarList() {
    this.mostrarAgregar = false;
    this.mostrarListado = true;
    this.mostrarEditar = false;
    this.mostrarEstadistica=false;
    this.listarLibreriaLibros();
  }

  mostrarEdit() {
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.mostrarEditar = true;
  }

  mostrarMas() {
    this.mostrarAgregarMasivo = true;
    this.mostrarAgregarIndividual = false;
  }

  mostrarIndi() {
    this.mostrarAgregarIndividual = true;
    this.mostrarAgregarMasivo = false;
  }

  estadisticas() {
    this.mostrarEstadistica = true;
    this.mostrarListado = false;
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.filtrarEstadistica();
    this.listarLibreriaLibros();
  }

  //Editar Libro
  enviarID(id) {
    this.mostrarEdit();
    this.libroService.getLibrosById(id).subscribe(
      (data: Libros) => {
        this.libros = data;
        console.log(data);
      },
      (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }

  enviarID_Eliminar(id) {
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.libroService.deleteLibros(id).subscribe(
          () => {},
          (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
          () => console.log("Complete")
        );
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire("Libro are not deleted", "", "info");
      }
    });
    this.mostrarList();
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: String = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      wb.SheetNames.forEach((sheet) => {
        this.listarLibreria = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        // this.convertedJson =JSON.stringify((XLSX.utils.sheet_to_json(wb.Sheets[sheet])),undefined,4);
        console.log(XLSX.utils.sheet_to_json(wb.Sheets[sheet]));

        for(let element of this.listarLibreria ){
          element.fecha_publicacion_libro=this.formatearFecha(new Date(element.fecha_publicacion_libro));

        }



        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.libroService.agregarListado(this.listarLibreria).subscribe(
              (data: any) => {
                this.listarLibreria = data;
                console.log(data);
                Swal.fire(
                  "Register Success!",
                  "Registrado correctamente",
                  "success"
                );
                this.mostrarList();
              },
              (error) =>
                Swal.fire(
                  "Register Failed!",
                  "Ha ocurrido un error",
                  "warning"
                ),
              () => console.log("Complete")
            );
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            this.mostrarList();
          }
        });
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  datos: Libros[] = [];
  arti: objeto[] = [];
  nuevo: objeto[] = [];
  fecha: String;
  filtrarEstadistica() {
    this.vaciar();
    this.arti = [];
    this.nuevo = [];
    this.datos = [];

    const star = "1/1/" + this.fecha;
    const end = "12/31/" + this.fecha;

    for (let element of this.listarLibreria) {
      if (
        new Date(element.fecha_publicacion_libro).getTime() >=
          new Date(star).getTime() &&
        new Date(element.fecha_publicacion_libro).getTime() <=
          new Date(end).getTime()
      ) {
        this.datos.push(element);
      }
    }

    this.yAxisLabel = "Año " + this.fecha;

    var cont: number;
    for (let element of this.monthNames) {
      cont = 0;

      for (let art of this.datos) {
        const fecha = this.getLongMonthName(
          new Date(art.fecha_publicacion_libro)
        );
        if (fecha == element) {
          cont++;
        }
      }
      const a = { name: element, value: cont };
      this.arti.push(a);
    }

    this.nuevo = this.arti;

    this.listarLibreria = [];
  }

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // getShortMonthName = function(date: Date) {
  //   return this.monthNames[date.getMonth()].substring(0, 3);
  // }
  getLongMonthName = function (date: Date) {
    return this.monthNames[date.getMonth()];
  };
  onSelect(event) {
    console.log(event);
  }

  vaciar() {
    this.arti = [];
    this.nuevo = [];
    this.listarLibreriaLibros();
  }



  exportAsXLSX(){
    this.exportService.exportToExcel(this.dataSource.data, 'Libros');

  }


 
  imprSelec() {
    var ficha = document.getElementById("estadistica");
    var ventimp = window.open(' ', 'popimpr');
    ventimp.document.write( ficha.innerHTML );
    ventimp.document.close();
    ventimp.print( );
    ventimp.close();
  }


}
