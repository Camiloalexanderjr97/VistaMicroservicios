import { DepartamentoService } from './../Services/departamento.service';
import { Departamento } from 'app/Modelos/Departamento';
import { TokenService } from 'app/Services/JWT/token.service';
import { element } from 'protractor';
import { GrupoService } from './../Services/grupo.service';
import { Grupo } from './../Modelos/Grupo';
import { Facultad } from '../Modelos/Facultad';
import { Component, OnInit } from '@angular/core';
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
  selector: 'grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupos = new Grupo();
  listarGrupos: Grupo[] = [];
  ListarDepartamentos: Departamento[]=[];
  displayedColumns: string[] = ["id", "sigla", "nombre","director", "canIntegrantes", "fechaConformacion", "semillero", "lineaInvestigacion","id_departamento"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private departamentoService: DepartamentoService,private tokenService: TokenService, private router: Router, private grupoService: GrupoService, private _liveAnnouncer: LiveAnnouncer) {
    //_CargaScripts.Carga(["main3"]);
  }



  listarGrupo(): void {
    this.listarGrupos.length=0;
    this.grupoService.getGrupo().subscribe((data: Grupo[]) => {


      for (let element of data) {
        element.id_departamento = element.departamento.name;
        this.listarGrupos.push(element);
      }
      console.log(this.listarGrupos)
      this.dataSource = new MatTableDataSource(this.listarGrupos);
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

      this.listarGrupo();
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
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  }


  myControl = new FormControl();
  // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  options: Facultad[];
  filteredOptions: Observable<Facultad[]>;


  //Ocultar y mostrar paneles de agregar y listar
  mostrarListado: Boolean = true;
  mostrarAgregar: Boolean = false;
  mostrarEditar: Boolean = false;

  mostrarAgg() {
    this.mostrarListado = false;
    this.mostrarAgregar = true;
    this.mostrarEditar = false;
    this.listadoDepartamentos();
  }

  mostrarList() {
    this.mostrarAgregar = false;
    this.mostrarListado = true;
    this.mostrarEditar = false;
    this.listarGrupo();
  }

  mostrarEdit() {
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.mostrarEditar = true;
    this.listadoDepartamentos();
  }


  listadoDepartamentos() {
    this.departamentoService.getDepartamento().subscribe((data: Departamento[]) => {
      this.ListarDepartamentos = data;
    })
  }

  creargrupo(){

    this.departamentoService.getDepartamentoById(this.grupos.id_departamento).subscribe(
      (data: Departamento) => {
        this.grupos.departamento = data;
        console.log(data);
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );

    console.log(this.grupos);
    this.grupoService.addGrupo(this.grupos).subscribe(
      (data: Grupo) => {
        this.grupos = data;

        Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }


}
