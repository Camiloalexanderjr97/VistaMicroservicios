import { TokenService } from 'app/Services/JWT/token.service';
import { Libros } from './../Modelos/Libros';
import { LibrosService } from '../Services/Libros.service';
// import { Libros } from '../Modelos/Libros';
import { Facultad } from './../Modelos/Facultad';
import { FacultadService } from './../Services/Facultad.service';
import { SubCategoriaService } from './../Services/SubCategoria.service';
// import { libro } from 'app/Modelos/libro';
// import { libroService } from 'app/Services/libro.service';
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
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

@Component({
  selector: 'libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {




  libros = new Libros();
  listarLibreria: Libros[]=[];



  
  displayedColumns: string[] = ["id_libro", "titulo_libro","numero_capitulos_libro","autores_libro","fecha_publicacion_libro","lugar_publicacion_libro","certificado_creditos_libro","certificado_investigacion_libro","editorial_libro","isbn_libro"];

  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filtroProducto: any;


  constructor( private fb: FormBuilder,private tokenService: TokenService,private router: Router,private libroService: LibrosService,private _liveAnnouncer: LiveAnnouncer,) {
    //_CargaScripts.Carga(["main3"]);

    this.filtroProducto = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
    })
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

  this.listarLibreriaLibros();
   
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

  listarLibreriaLibros(): void {
    this.libroService.getLibreria().subscribe( (data: Libros[]) => {
        
        this.listarLibreria = data ;
       
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    )
  }

  
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  filtrarPro() {
    const x = (event.target as HTMLInputElement).value;
    const fechaIni = this.formatearFecha(this.filtroProducto.value.StartDate);
    const fechaFin = this.formatearFecha(this.filtroProducto.value.EndDate);
    console.log(fechaIni + "-------Fecha Inicio"+this.filtroProducto.value.StartDate);
    console.log(fechaFin + "-------Fecha FIn");
    const data:Libros[]=[];
    for(let element of this.listarLibreria){ 

      console.log(new Date(element.fecha_publicacion_libro).getTime())
      if((new Date(element.fecha_publicacion_libro).getTime()>=new Date(fechaIni).getTime())&& ( new Date(element.fecha_publicacion_libro).getTime()<=new Date(fechaFin).getTime())){
        data.push(element);
      
      }
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  }
  vaciarFiltro(){
    this.filtroProducto.reset();
    this.listarLibreriaLibros();
  }

  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
  crearLibros() {
    alert(this.libros.id_libro);


    this.libroService
      .addLibros(this.libros)
      .subscribe(
        (data: Libros) => {
          this.libros = data;
          Swal.fire("Register Success!", "Registrado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }

  editarLibro() {

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

    this.libroService
      .editLibros(this.libros)
      .subscribe(
        (data: Libros) => {
          this.libros = data;
          console.log(data);
          Swal.fire("Register Success!", "Actualizado correctamente", "success");
         this.mostrarList();
        },
        (error) =>
          Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
        () => console.log("Complete")
      );
  }

  
  // myControl = new FormControl();
  // // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  // options: Facultad[] ;
  // filteredOptionsSubCategoria: Observable<Libros[]>;
  // filteredOptionsFacultad: Observable<Facultad[]>;



  

//Ocultar y mostrar paneles de agregar y listar
mostrarListado: Boolean = true;
mostrarAgregar: Boolean = false;
mostrarEditar: Boolean = false;
mostrarAgregarIndividual: Boolean= false;
mostrarAgregarMasivo: Boolean=false;

mostrarAgg() {
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
  this.listarLibreriaLibros();
}

mostrarEdit() {
  this.mostrarAgregar = false;
  this.mostrarListado = false;
  this.mostrarEditar = true;
}

mostrarMas(){

  this.mostrarAgregarMasivo=true;
  this.mostrarAgregarIndividual=false;
}

mostrarIndi(){
  this.mostrarAgregarIndividual=true;
  this.mostrarAgregarMasivo=false;    

 }



//Editar Libro

enviarID(id){
  this.mostrarEdit();

  this.libroService.getLibrosById(id).subscribe(
    (data: Libros) => {
      this.libros = new Libros();
      
      this.libros=data;
      console.log(data);
      alert(data.id_libro);
    },
    (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete")
  );

}

enviarID_Eliminar(id) {

  Swal.fire({
    title: 'Do you want to Delete?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      this.libroService.deleteLibros(id).subscribe(()=>{
    
      }, (error) =>
      Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
    () => console.log("Complete"))
      } else if (result.isDenied) {
      Swal.fire('Libro are not deleted', '', 'info')

    }
   
  })
 this.mostrarList();
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
      this.listarLibreria = (XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
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

            this.libroService.agregarListado(this.listarLibreria).subscribe(
        (data: any) => {
          this.listarLibreria = data;
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


