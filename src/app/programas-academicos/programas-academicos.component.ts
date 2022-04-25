import { ViewChild } from "@angular/core";
import { FacultadService } from "./../Services/Facultad.service";
import { Facultad } from "./../Modelos/Facultad";
import { ProgramaAcademicoService } from "./../Services/ProgramaAcademico.service";
import { ProgramaAcademico } from "./../Modelos/ProgramaAcademico";
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

declare var $;
var DataTable = require("datatables.net");

// var dt = require( 'datatables.net' )();

// export interface ProgramaAcademicoInterface {
//   id?: String;
//   nombre?: String;
// }


@Component({
  selector: "programas-academicos",
  templateUrl: "./programas-academicos.component.html",
  styleUrls: ["./programas-academicos.component.css"],
})
export class ProgramasAcademicosComponent implements OnInit {
  programaAcademico = new ProgramaAcademico();
  ListarProgramas: ProgramaAcademico[] = [];

  Facultad = new Facultad();
  ListarFacultad: Facultad[] = [];



  


  
  displayedColumns: string[] = ["id", "nombre"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;





  constructor(    private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private programaAcademicoService: ProgramaAcademicoService,
    private router: Router,
    icon: MatIconModule,
    private facultadService: FacultadService
  ) {
    //_CargaScripts.Carga(["main3"]);
  }


  ngOnInit() {
    // this._CargaScripts.Carga(["mainTable"]);

    this.listarProgramasAcademicos();


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

  listarProgramasAcademicos() {
    this.programaAcademicoService
      .getProgramasAcademicos()
      .subscribe((data: Facultad[]) => {
        this.ListarProgramas = data;

        console.log(this.ListarProgramas);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }



  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  crearProgramaAcademico() {

    this.programaAcademico.facultad
    var splitted = this.programaAcademico.facultad.split("-", 1); 
    this.programaAcademico.facultad=splitted[0];


    // alert(
    //   this.programaAcademico.facultad +
    //     "-" +
    //     this.programaAcademico.id +
    //     "-" +
    //     this.programaAcademico.nombre
    // );

    this.programaAcademicoService
      .addProgramaAcademico(this.programaAcademico)
      .subscribe(
        (data: ProgramaAcademico) => {
          this.programaAcademico = data;
          console.log(data);
          Swal.fire("Register Success!", "Registrado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }



  listarFacultades() {

    

    this.facultadService.getFacultad().subscribe((data: Facultad[]) => {
      this.ListarFacultad = data;
      console.log(this.ListarFacultad);
    });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(nombre => {
        return this.ListarFacultad.filter((option) =>
        
        option.nombre
        );
      })
    );
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
    this.listarFacultades();
  }

  mostrarList() {
    this.mostrarAgregar = false;
    this.mostrarListado = true;
    this.mostrarEditar = false;
    this.listarProgramasAcademicos();
  }

  mostrarEdit() {
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.mostrarEditar = true;
    this.listarFacultades();
  }




//Editat Programa Academico

enviarID(id){
  this.mostrarEdit();
  this.listarFacultades();

  console.log(id+"_id")
  this.programaAcademicoService.getProgramaAcademicoById(id)  .subscribe(
    (data: ProgramaAcademico) => {
      this.programaAcademico = new ProgramaAcademico();
      
      this.programaAcademico=data;
      console.log(data);
      alert(data.id);
    },
    (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete")
  );

}

}
