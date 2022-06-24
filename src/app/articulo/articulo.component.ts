import { ExportService } from 'app/Services/ConverterExcel/exporter.service';
import { TokenService } from 'app/Services/JWT/token.service';
import { Component, OnInit } from '@angular/core';
import { Articulos } from 'app/Modelos/Articulos';
import { ArticuloService } from 'app/Services/articulo.service';

import { ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { CargarScriptsService } from "cargar-scripts.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { subCategorias } from 'app/Modelos/SubCategorias';
import * as XLSX from 'xlsx';


interface objeto {
  name: any;
  value: any;
}
@Component({
  selector: 'articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos = new Articulos();
  listarArticulos: Articulos[]=[];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria de Productos';
  showYAxisLabel = true;
  yAxisLabel;
  showDataLabel=true;


  colorScheme = {
    domain: [  '#FF8A80', 
    '#EA80FC',
    '#8C9EFF', 
    '#80D8FF', 
    '#A7FFEB', 
    '#CCFF90', 
    '#FFFF8D', 
    '#FF9E80']
  };
    
  displayedColumns: string[] = ["id_articulo", "nombre_revista","titulo_articulo","autores_articulo","fecha_articulo","volumen_articulo","pagina_inical","pagina_final","issn_articulo","doi_articulo","url_articulo"];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  filtroProducto: any;

  constructor(    private exportService: ExportService,
    private fb: FormBuilder,private tokenService: TokenService, private router: Router,private articuloService: ArticuloService,private _liveAnnouncer: LiveAnnouncer) {
    //_CargaScripts.Carga(["main3"]);
    
    this.filtroProducto = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
    })
  }
  


  listarArticulo(): void {
    this.articuloService.getArticulos().subscribe( (data: any) => {
        
        this.listarArticulos = data ;

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }


  crearArticulo(){
    this.articuloService.addArticulo(this.articulos)
    .subscribe(
      (data: Articulos) => {
        this.articulos = data;
        Swal.fire("Register Success!", "Registrado correctamente", "success");
       this.mostrarList(); 
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }
  
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  filtrarPro() {
    const x = (event.target as HTMLInputElement).value;
    const fechaIni = this.formatearFecha(this.filtroProducto.value.StartDate);
    const fechaFin = this.formatearFecha(this.filtroProducto.value.EndDate);
    const data:Articulos[]=[];
    for(let element of this.listarArticulos){ 

      // console.log(new Date(element.fecha_publicacion_libro).getTime())
      if((new Date(element.fecha_articulo).getTime()>=new Date(fechaIni).getTime())&& ( new Date(element.fecha_articulo).getTime()<=new Date(fechaFin).getTime())){
        data.push(element);
      
      }
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  }
  vaciarFiltro(){
    this.filtroProducto.reset();
    this.listarArticulo();
  }

  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
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

    if (this.tokenService.getToken()) {
      this.isLogged = true;  
      this.listarArticulo();
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



mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;
mostrarAgregarIndividual: Boolean= false;
mostrarAgregarMasivo: Boolean=false;
mostrarEstadistica: Boolean =false;
mostrarAgg() {

  Swal.fire({
    title: 'Como le gustaría crear el Articulo?',
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
  this.mostrarEstadistica = false;
  this.listarArticulo();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
  this.mostrarEstadistica = false;

}

mostrarMas(){

  this.mostrarAgregarMasivo=true;
  this.mostrarAgregarIndividual=false;
}

mostrarIndi(){
  this.mostrarAgregarIndividual=true;
  this.mostrarAgregarMasivo=false;    

 }

 estadisticas() {
  this.mostrarEstadistica = true;
  this.mostrarListado = false;
  this.mostrarAgregar = false;
  this.mostrarEditar = false;
  this.filtrarEstadistica();
  this.listarArticulo();
}


editarArticulo() {

  // this.libros.facultad;
  // var splitted = this.libros.facultad.split("-", 1); 
  // this.libros.facultad=splitted[0];


  // alert(
  //   this.libros.facultad +
  //     "-" +
  //     this.libros.id +
  //     "-" +
  //     this.libros.nombre
  // );

  this.articuloService
    .editArticulo(this.articulos)
    .subscribe(
      (data: Articulos) => {
        this.articulos = data;
        Swal.fire("Register Success!", "Actualizado correctamente", "success");
       this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
}

//Editar Libro

enviarID(id){
  this.mostrarEdit();
  this.articuloService.getArticuloById(id).subscribe(
    (data: Articulos) => {
      this.articulos = new Articulos();  
      this.articulos=data;
      console.log(data);
    },
    (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete")
  );

}

EliminarArticulo(id){
  Swal.fire({
    title: 'Do you want to Delete?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {  
  this.articuloService.deleteArticulo(id).subscribe();
  window.location.reload();
    } else if (result.isDenied) {
      Swal.fire('Product are not deleted', '', 'info')
   
    }
    this.mostrarList();
  })


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
      this.listarArticulos = (XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
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
       
            this.articuloService.agregarListado(this.listarArticulos).subscribe(
        (data: any) => {
          this.listarArticulos = data;
          
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



datos: Articulos[] = [];
arti: objeto[] = [];
nuevo: objeto[] = []
fecha:String;
filtrarEstadistica(){
  this.vaciar();
    this.arti=[];
    this.nuevo=[];
    this.datos=[];
    

const star="1/1/"+this.fecha;
const end="12/31/"+this.fecha;
 for (let element of this.listarArticulos) {
      if ((new Date(element.fecha_articulo).getTime() >= new Date(star).getTime()) && (new Date(element.fecha_articulo).getTime() <= new Date(end).getTime())) {
          
        
        this.datos.push(element);


      }
    }

    this.yAxisLabel="Año "+this.fecha;

       var cont:number;
        for (let element of this.monthNames) {
          cont=0;

          for(let art of this.datos){
            const fecha=this.getLongMonthName(new Date(art.fecha_articulo));
            if(fecha==element){
              cont++;
            }

          }
          const a = { name: element, value: cont }
          this.arti.push(a);
          
  
        }

    this.nuevo = this.arti;


    
    this.listarArticulos=[];
}

monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// getShortMonthName = function(date: Date) {
//   return this.monthNames[date.getMonth()].substring(0, 3);
// }
getLongMonthName = function(date: Date) {
    return this.monthNames[date.getMonth()];
}
onSelect(event) {
  console.log(event);
}

vaciar(){
  this.arti=[];
    this.nuevo=[];
    this.listarArticulo();

}
exportAsXLSX(){
  this.exportService.exportToExcel(this.dataSource.data, 'Articulos');

}

imprSelec() {
  var ficha = document.getElementById("estadistica");
  var ventimp = window.open(' ', 'popimpr');
  ventimp.document.write( ficha.innerHTML );
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
}

}
