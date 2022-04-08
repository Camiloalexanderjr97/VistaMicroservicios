import { Component, OnInit } from '@angular/core';
import { Producto } from 'app/Modelos/Producto';
import { ProductoService } from 'app/Services/producto.service';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos = new Producto();
  listarProductos: Producto[]=[];


  constructor(private productoService: ProductoService) {
    //_CargaScripts.Carga(["main3"]);
  }
  


  listarProducto(): void {
    this.productoService.getProductos().subscribe( (data: any) => {
        
        this.listarProductos = data ;
        console.log(data.nombre)
        console.log(this.listarProductos)
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
  this.listarProducto();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

}
}
