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
import * as XLSX from 'xlsx';

@Component({
  selector: 'facultads',
  templateUrl: './facultads.component.html',
  styleUrls: ['./facultads.component.css']
})
export class FacultadsComponent implements OnInit {

  Facultad = new Facultad();
  ListarFacultad: Facultad[]=[];




    
  displayedColumns: string[] = ["id", "nombre"];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

 

  
    constructor( private router: Router,
      icon: MatIconModule,
      private facultadService: FacultadService, private _liveAnnouncer: LiveAnnouncer) {
      //_CargaScripts.Carga(["main3"]);
    }
     listarFacultades(){
      this.facultadService.getFacultad().subscribe((data: any) => {
        this.ListarFacultad = data;
        console.log(this.ListarFacultad);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },(error) => console.log(error),
      () => console.log("Complete"));
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

    
ngOnInit() {
  this.listarFacultades();
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
  this.mostrarAgregar = false;
  this.mostrarListado = true;
  this.mostrarEditar = false;
  this.listarFacultades();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
  this.listarFacultades();
}

mostrarMas(){

  this.mostrarAgregarMasivo=true;
  this.mostrarAgregarIndividual=false;
}

mostrarIndi(){
  this.mostrarAgregarIndividual=true;
  this.mostrarAgregarMasivo=false;    

 }

  
onFileChange(evt: any){
  const target: DataTransfer = <DataTransfer>(evt.target);
  const reader: FileReader = new FileReader();
  reader.onload=(e: any)=>{
    const bstr: String =e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});

    const wsname : string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];



    wb.SheetNames.forEach(sheet =>{
      this.ListarFacultad = (XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
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

            this.facultadService.agregarListado(this.ListarFacultad).subscribe(
        (data: any) => {
          this.ListarFacultad = data;
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
