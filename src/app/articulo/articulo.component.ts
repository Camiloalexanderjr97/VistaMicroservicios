import { Component, OnInit } from '@angular/core';
import { Articulos } from 'app/Modelos/Articulos';
import { ArticuloService } from 'app/Services/articulo.service';

@Component({
  selector: 'articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos = new Articulos();
  listarArticulos: Articulos[]=[];


  constructor(private articuloService: ArticuloService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarArticulo(): void {
    this.articuloService.getArticulos().subscribe( (data: any) => {
        
        this.listarArticulos = data ;
        console.log(data.nombre)
        console.log(this.listarArticulos)
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
  this.listarArticulo();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
