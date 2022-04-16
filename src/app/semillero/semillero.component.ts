import { SemilleroService } from './../Services/semillero.service';
import { Component, OnInit } from '@angular/core';
import { Semillero } from 'app/Modelos/Semillero';

@Component({
  selector: 'semillero',
  templateUrl: './semillero.component.html',
  styleUrls: ['./semillero.component.css']
})
export class SemilleroComponent implements OnInit {

  Semilleros = new Semillero();
  listarSemilleros: Semillero[]=[];


  constructor(private SemilleroService: SemilleroService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarSemillero(): void {
    this.SemilleroService.getSemillero().subscribe( (data: any) => {
        
        this.listarSemilleros = data ;
        console.log(data.nombre)
        console.log(this.listarSemilleros)
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
  this.listarSemillero();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
