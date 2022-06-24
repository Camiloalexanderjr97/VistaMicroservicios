import { ExportService } from 'app/Services/ConverterExcel/exporter.service';
import { element } from 'protractor';
import { ProgramaAcademicoService } from './../Services/ProgramaAcademico.service';
import { ProgramaAcademico } from './../Modelos/ProgramaAcademico';
import { TokenService } from "app/Services/JWT/token.service";
import { SemilleroService } from "./../Services/semillero.service";
import { Semillero } from "app/Modelos/Semillero";
import { FacultadService } from "./../Services/Facultad.service";
import { Facultad } from "../Modelos/Facultad";
import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
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
import * as XLSX from "xlsx";


interface objeto {
  name: any;
  value: any;
}

@Component({
  selector: "semillero",
  templateUrl: "./semillero.component.html",
  styleUrls: ["./semillero.component.css"],
})
export class SemilleroComponent implements OnInit {
  Semilleros = new Semillero();
  listarSemilleros: Semillero[] = [];
  listarSemillerosByPrograma: Semillero[]=[];

  ListarFacultad: Facultad[]=[];
  filteredOptionsFacultad: Observable<Facultad[]>;
  myControlFacultad = new FormControl();



  id: String;
  sigla: String;
  nombre: String;
  cantidadGrupo: number;
  cantidadEstudiantes:  number;
  fechaConformacion: Date;

  displayedColumns: string[] = [
    "id",
    "nombre",
    "sigla",
    "canEstudiantes",
    "fechaConformacion",
    "programaAcademico"
  ];
  dataSource: any;

  multi: any[];

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
    domain: [
      '#FF8A80', 
      '#EA80FC',
      '#8C9EFF', 
      '#80D8FF', 
      '#A7FFEB', 
      '#CCFF90', 
      '#FFFF8D', 
      '#FF9E80'
    ]
  };




  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private exportService: ExportService,
    private facultadService: FacultadService,
    private programaAcademicoService: ProgramaAcademicoService,
    private tokenService: TokenService,
    private router: Router,
    private SemilleroService: SemilleroService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    //_CargaScripts.Carga(["main3"]);
  }

  listarSemillero(): void {
    this.listarSemilleros=[];
    this.SemilleroService.getSemillero().subscribe(
      (data: any) => {
        
        console.log(data.nombre);
        console.log(this.listarSemilleros);


        for(let element of data){
        this.programaAcademicoService.getProgramaAcademicoById(element.programaAcademico).subscribe((programa: ProgramaAcademico) => {
          element.programaAcademico = programa.nombre;
       
        });
        this.listarSemilleros.push(element);
      }

        this.dataSource = new MatTableDataSource(this.listarSemilleros);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log(error),
      () => console.log("Complete")
    );
  }

  guardarPrograma(dato: any){ 
    this.program=dato.target.value;

    console.log(this.program)


    // const tipo =this.program;

    // this.listarSemilleros=[];
    // this.SemilleroService.getSemillero().subscribe(
    //   (data: any) => {
        


    //     for(let element of data){

    //     this.programaAcademicoService.getProgramaAcademicoById(element.programaAcademico).subscribe((programa: ProgramaAcademico) => {
    //       element.programaAcademico = programa.nombre;
       
    //     });
    //     if(element.programaAcademico==tipo){
    //       console.log("Push elemento");

    //     this.listarSemillerosByPrograma.push(element);
    //     }
    //   }

    //   },
    //   (error) => console.log(error),
    //   () => console.log("Complete")
    // );
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

  crearsemillero() {
    this.Semilleros.id = this.id;
    this.Semilleros.sigla = this.sigla;
    this.Semilleros.nombre = this.nombre;
    this.Semilleros.canGrupos = this.cantidadGrupo;
    this.Semilleros.canEstudiantes = this.cantidadEstudiantes;
    this.Semilleros.fechaConformacion = this.fechaConformacion;
    this.SemilleroService.addSemillero(this.Semilleros).subscribe(
      (data: any) => {
        Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.mostrarList();
      },
      (error) =>
        Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),

      () => console.log("Complete")
    );
  }

  enviarID(id) {
    this.mostrarEdit();
    this.SemilleroService.getSemilleroById(id).subscribe(
      (data: Semillero) => {
        this.Semilleros = data;
        
        console.log(data);
      },
      (error) => Swal.fire("Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  myControl = new FormControl();
  // options: User[] = [{nombre: 'Mary'}, {nombre: 'Shelley'}, {nombre: 'Igor'}];
  options: Facultad[];
  filteredOptions: Observable<Facultad[]>;

  //Ocultar y mostrar paneles de agregar y listar
  mostrarListado: Boolean = true;
  mostrarAgregar: Boolean = false;
  mostrarEditar: Boolean = false;
  mostrarAgregarIndividual: Boolean = false;
  mostrarAgregarMasivo: Boolean = false;
  mostrarEstadistica:Boolean=false;
  mostrarAgg() {
    
    this.listarFacultades();
    this.listarSemillero();
    Swal.fire({
      title: "Como le gustaría crear el Libro?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Individual",
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
    });
  }
  mostrarList() {
    this.mostrarAgregar = false;
    this.mostrarListado = true;
    this.mostrarEditar = false;
    this.listarSemillero();
  }

  mostrarEdit() {
    this.mostrarAgregar = false;
    this.mostrarListado = false;
    this.mostrarEditar = true;
    this.listarSemillero();
    this.listarFacultades();
  }

  mostrarMas() {
    this.mostrarAgregarMasivo = true;
    this.mostrarAgregarIndividual = false;
  }

  mostrarIndi() {
    this.mostrarAgregarIndividual = true;
    this.mostrarAgregarMasivo = false;
  }


  estadisticas() {
    this.mostrarEstadistica = true;
    this.mostrarListado = false;
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.listarFacultades();
  }

  isLogged = false;
  soloAdmin = false;
  ngOnInit() {
    const rol = sessionStorage.getItem("rol_");
    if (rol === "ROLE_ADMIN") {
      this.soloAdmin = true;
    } else {
      this.soloAdmin = false;
    }
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.listarSemillero();
    } else {
      this.isLogged = false;

      this.router.navigate(["/login"]);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No tienes Acceso",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: String = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      wb.SheetNames.forEach((sheet) => {
        this.listarSemilleros = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        // this.convertedJson =JSON.stringify((XLSX.utils.sheet_to_json(wb.Sheets[sheet])),undefined,4);
console.log(this.listarSemilleros);
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.SemilleroService.agregarListado(
              this.listarSemilleros
            ).subscribe(
              (data: any) => {
                this.listarSemilleros = data;
                console.log(data);
                Swal.fire(
                  "Register Success!",
                  "Registrado correctamente",
                  "success"
                );
                this.mostrarList();
              },
              (error) =>
                Swal.fire(
                  "Register Failed!",
                  "Ha ocurrido un error",
                  "warning"
                ),
              () => console.log("Complete")
            );
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            this.mostrarList();
          }
        });
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  listaPro:ProgramaAcademico[]=[];
  mostrar(dato: any){
    this.listaPro=[];
    const fac =dato.target.value;
    this.programaAcademicoService.getProgramasAcademicos().subscribe((data: ProgramaAcademico[]) => {
  
      for(let element of data){
        const id =element.idFacultad.id;
  
        if(id==fac){
  
          this.listaPro.push(element);
        }
      }
    });
  }



  listarFacultades() {
    this.facultadService.getFacultad().subscribe((data: Facultad[]) => {
      this.ListarFacultad = data;
    });

    this.filteredOptionsFacultad = this.myControlFacultad.valueChanges.pipe(
      startWith(""),
      map((nombre) => {
        return this.ListarFacultad.filter((option) => option.nombre);
      })
    );
  }


  inicio = new FormControl(new Date().toISOString());
  fin = new FormControl(new Date().toISOString());

  datos: Semillero[] = [];
  pros: objeto[] = []; 
  nuevo: objeto[] = []
  program:String='';
  filtrarEstadistica() {
    this.vaciar();
    this.pros=[];
    this.nuevo=[];
    this.datos=[];

    console.log("this.program1");

    for (let element of this.listarSemilleros) {
      console.log(element.programaAcademico+"this.program2"+element.nombre)


      if ((new Date(element.fechaConformacion).getTime() >= new Date(this.inicio.value).getTime()) && (new Date(element.fechaConformacion).getTime() <= new Date(this.fin.value).getTime()) && element.programaAcademico==this.program) {
        console.log("this.program3")

        this.datos.push(element);



      }
    
    }

    this.yAxisLabel=this.formatearFecha(new Date(this.inicio.value))+ "  -  "+this.formatearFecha(new Date(this.fin.value));


      for (let semillero of this.datos) {
       var cont:number;
          cont=0;
           cont=semillero.canEstudiantes;
          
          
        const a = { name: semillero.nombre, value: cont }
  
        this.pros.push(a);
        }
  
    this.nuevo = this.pros;

  
    this.datos=[];

  }


  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  vaciar(){
    this.pros=[];
      this.nuevo=[];
    this.listarSemillero();
  }


  exportAsXLSX(){
    this.exportService.exportToExcel(this.dataSource.data, 'Semilleros');
  
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
