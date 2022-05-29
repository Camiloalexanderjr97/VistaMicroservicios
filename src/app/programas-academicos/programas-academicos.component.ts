import { TokenService } from 'app/Services/JWT/token.service';
import { element } from 'protractor';
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
import * as XLSX from 'xlsx';

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



  


  
  displayedColumns: string[] = ["id", "nombre","facultad"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;





  constructor(    private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private programaAcademicoService: ProgramaAcademicoService,
    private router: Router,
    icon: MatIconModule,
    private facultadService: FacultadService,
    private tokenService: TokenService
  ) {
    //_CargaScripts.Carga(["main3"]);
  }

  isLogged=false;
  soloAdmin=false;
  ngOnInit() {

    const rol = sessionStorage.getItem("rol_");
    if(rol==='ROLE_ADMIN'){
      this.soloAdmin=true;

    }else{
      this.soloAdmin=false;
    }          

    if (this.tokenService.getToken()) {
      this.isLogged = true;

    this.listarProgramasAcademicos();
  
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

  listarProgramasAcademicos() {
    this.programaAcademicoService
      .getProgramasAcademicos()
      .subscribe((data: ProgramaAcademico[]) => {
        this.ListarProgramas=data;
        for(let element of this.ListarProgramas){
          console.log(element.facultad)
          // element.facultad=element.id_facultad.nombre;
          // alert(element.id_facultad.nombre)
        }

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
        (data: any) => {
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
  mostrarAgregarIndividual: Boolean= false;
  mostrarAgregarMasivo: Boolean=false;

  mostrarAgg() {
    this.listarFacultades();


    Swal.fire({
      title: 'Como le gustaría crear el Programa Academico?',
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

  mostrarIndi(){
   this.mostrarAgregarIndividual=true;
   this.mostrarAgregarMasivo=false;    

  }
  mostrarMas(){

    this.mostrarAgregarMasivo=true;
    this.mostrarAgregarIndividual=false;
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
  this.programaAcademicoService.getProgramaAcademicoById(id).subscribe(
    (data: any) => {
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

convertedJson!: String;

onFileCh2ange(event: any){
console.log(event.target.files);
  const selectedFIle = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(selectedFIle);
  fileReader.onload = (event: any) =>{
    console.log(event);
    let binaryData = event.target.result;
    let wb =XLSX.read(binaryData, {type: 'binary'});
    console.log(wb);
   
   
       const wsname : string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];



wb.SheetNames.forEach(sheet =>{
  this.ListarProgramas = (XLSX.utils.sheet_to_json(ws, { header: 1}));
  this.convertedJson =JSON.stringify(this.ListarProgramas,undefined,4);

  console.log(this.convertedJson);
})
    // workbook.SheetNames.forEach(sheet =>{
    //   const data = XLSX.utils.sheet_to_json(ws, { header: 1});
    //   console.log(data);
    //   this.convertedJson =JSON.stringify(data,undefined,4);

    // });
  }
}


excel: [][];
onFileChange(evt: any){
  const target: DataTransfer = <DataTransfer>(evt.target);
  const reader: FileReader = new FileReader();
  reader.onload=(e: any)=>{
    const bstr: String =e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});

    const wsname : string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];



    wb.SheetNames.forEach(sheet =>{
      this.ListarProgramas = (XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
      // this.convertedJson =JSON.stringify((XLSX.utils.sheet_to_json(wb.Sheets[sheet])),undefined,4);
     

      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            this.programaAcademicoService.agregarListado(this.ListarProgramas).subscribe(
        (data: any) => {
          this.programaAcademico = data;
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

}
