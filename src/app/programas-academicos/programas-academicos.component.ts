import { ProgramaAcademicoService } from './../Services/ProgramaAcademico.service';
import { ProgramaAcademico } from './../Modelos/ProgramaAcademico';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'programas-academicos',
  templateUrl: './programas-academicos.component.html',
  styleUrls: ['./programas-academicos.component.css']
})
export class ProgramasAcademicosComponent implements OnInit {

  programaAcademico = new ProgramaAcademico();
  ListarProgramas: ProgramaAcademico[]=[];
  
    constructor(private programaAcademicoService: ProgramaAcademicoService) {
      //_CargaScripts.Carga(["main3"]);
    }
     listarFacultades(){
      this.programaAcademicoService.getProgramasAcademicos().subscribe((data: any) => {
        this.ListarProgramas = data;
        console.log(this.ListarProgramas);
      });
    }

    
  
  ngOnInit() {
    this.listarFacultades();
  }
  
}
