import { GrupoService } from './../Services/grupo.service';
import { Grupo } from './../Modelos/Grupo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupos = new Grupo();
  listarGrupos: Grupo[]=[];


  constructor(private grupoService: GrupoService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarGrupo(): void {
    this.grupoService.getGrupo().subscribe( (data: any) => {
        
        this.listarGrupos = data ;
        console.log(data.nombre)
        console.log(this.listarGrupos)
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
  this.listarGrupo();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
