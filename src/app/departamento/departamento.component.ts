import { ProgramaAcademico } from './../Modelos/ProgramaAcademico';
import { element } from 'protractor';
import { ProgramaAcademicoService } from './../Services/ProgramaAcademico.service';
import { TokenService } from 'app/Services/JWT/token.service';
import { DepartamentoService } from './../Services/departamento.service';
// import { Component, OnInit } from '@angular/core';
import { Departamento } from 'app/Modelos/Departamento';
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
  selector: 'departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos = new Departamento();
  departamentoN = new Departamento();
  listarDepartamentos: Departamento[]=[];

  name: any="";
  programa: any="";

  ListarProgramas: ProgramaAcademico[]=[];

    
  displayedColumns: string[] = ["id", "name","programa"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

 

  

  constructor(private tokenService: TokenService, private router: Router,private departamentoService: DepartamentoService,private programaAcademicoService: ProgramaAcademicoService, private _liveAnnouncer: LiveAnnouncer) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarDepartamento(): void {
    this.listarDepartamentos.length=0;
    this.departamentoService.getDepartamento().subscribe( (data: Departamento[]) => {
        

      for(let element of data){

        this.programaAcademicoService.getProgramaAcademicoById(element.progAcademico).subscribe( (prog: ProgramaAcademico) => {
          element.programa=prog.nombre;
        },
        (error) => console.log(error),
        () => console.log("Complete")
      )
      this.listarDepartamentos.push(element);

      }

     
        this.dataSource = new MatTableDataSource(this.listarDepartamentos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

  listadoProgramas() {
    this.programaAcademicoService.getProgramasAcademicos().subscribe((data: ProgramaAcademico[]) => {
      this.ListarProgramas = data;
      console.log(data);
    })
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



  

isLogged=false;
soloAdmin=false;
ngOnInit() {

  const rol = sessionStorage.getItem("rol_");
  if(rol==='ROLE_ADMIN'){
    this.soloAdmin=true;

  }else{
    this.soloAdmin=false;
  }  
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    if(this.tokenService.getToken()){
      this.isLogged=true;
    this.listarDepartamento();
    }else{
      this.isLogged=false;


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


//Ocultar y mostrar paneles de agregar y listar
mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;

mostrarAgg() {
  this.mostrarListado = false;
  this.mostrarAgregar = true;
  this.mostrarEditar = false;
  this.listadoProgramas();

}

mostrarList() {
  this.mostrarAgregar = false;
  this.mostrarListado = true;
  this.mostrarEditar = false;
  this.listarDepartamento();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
  this.listarDepartamento();
}

crearDepartamento(){

  console.log(this.departamentos)
    this.departamentoService.addDepartamento(this.departamentos).subscribe(
      (data: Departamento) => {
        this.departamentos = data;

        Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }
  
  idEnviar: any;
  enviarID(id){
    this.idEnviar=id;
      this.mostrarEdit();
      this.listadoProgramas();
      this.departamentoService.getDepartamentoById(id).subscribe(
        (data: Departamento) => {
          this.departamentos = data;
          
          console.log(data);
        },
        (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
    }
    
    editar(){

      this.departamentoN.id=this.idEnviar;
      this.departamentoN.name=this.name;
      this.departamentoN.progAcademico=this.programa;

      console.log(this.departamentoN);
      const res= this.validarVacios(this.departamentoN);

      const dato=JSON.stringify(this.departamentoN);
      console.log(dato);
      console.log(res);  
      if(res==true){
    
        Swal.fire("Edit Failed!", "Datos Incompletos", "warning");
       }else{
      this.departamentoService.editDepartamento(this.departamentoN,this.idEnviar).subscribe(
        (data: any) => {
          console.log(data);
  
          Swal.fire("Edit Success!", "Editado correctamente", "success");
          this.mostrarList();
        },
        (error) =>
          Swal.fire("Edit Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
    }
  }



  validarVacios(departamento: Departamento): boolean{
   
    let vacio =true;

    console.log(departamento.name+"-"+departamento.progAcademico);
    if(departamento.name!="" && departamento.progAcademico!=0 ){
      vacio=false;

  }

    return vacio;
  }

}
