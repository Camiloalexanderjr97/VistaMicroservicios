import { DepartamentoService } from './../Services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Departamento } from 'app/Modelos/Departamento';

@Component({
  selector: 'departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos = new Departamento();
  listarDepartamentos: Departamento[]=[];


  constructor(private departamentoService: DepartamentoService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarDepartamento(): void {
    this.departamentoService.getDepartamento().subscribe( (data: any) => {
        
        this.listarDepartamentos = data ;
        console.log(data.nombre)
        console.log(this.listarDepartamentos)
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
  this.listarDepartamento();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
