import { LibrosService } from '../Services/Libros.service';
import { Libros } from '../Modelos/Libros';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
// import  {  SweetAlert2Module  }  from  '@sweetalert2/ngx-sweetalert2' ;
import { NgModule } from '@angular/core';
// import { CargarScriptsService } from "../cargar-scripts.service";
// import Swal from 'sweetalert2';
import { pluck} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';

@Component({
  selector: 'libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  // public saveFile(fileName: string): void {
  //   // ... save file
  // }

  // public handleDenial(): void {
  //     // ... don't save file and quit
  // }

  // public handleDismiss(dismissMethod: string): void {
  //   // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
  //   // ... do something
  // }


  libros = new Libros();
  listarLibreria: Libros[]=[];


  constructor(private libroService: LibrosService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarLibreriaLibros(): void {
    this.libroService.getLibreria().subscribe( (data: any) => {
        
        this.listarLibreria = data ;
        console.log(data)
        console.log(this.listarLibreria)
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

  



  // alerta1(){
  //   Swal.fire(    {
  //     title: '¿Estas seguro de firmar?',
  //     text: "Ten cuidado los documentos que firmas!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Seguro!',
  //     cancelButtonText: 'Cancelar',
  //     reverseButtons: true
  //   } ).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Documento Firmado!',
  //         'fue exitoso el proceso.',
  //         'success'
  //       )
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       Swal.fire(
  //         'Cancelado',
  //         ':)',
  //         'error'
  //       )
  //     }
  //   })
  // }
  // alerta2(){
  //   Swal.fire(    'Alerta!',  'Alerta!',  'success'    );
  // }
  // alerta3(){
  //   Swal.fire(    'Alerta!',  'Alerta!',  'warning'    );
  // }
  



ngOnInit() {
  this.listarLibreriaLibros();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}

}


