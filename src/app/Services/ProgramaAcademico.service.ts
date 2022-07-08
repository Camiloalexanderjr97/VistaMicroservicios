import { ProgramaAcademico } from './../Modelos/ProgramaAcademico';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlProgramaAcedmico } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
}) 
export class ProgramaAcademicoService {

  private url = `${urlProgramaAcedmico}/api/programas-acad`;
  // private url2 = `${urlProgramaAcedmico}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getProgramaAcademicos
  getProgramasAcademicos(): Observable<ProgramaAcademico[]> {
    return this.http.get<ProgramaAcademico[]>(this.url);
  }

  //get un ProgramaAcademico
  getProgramaAcademicoById(id: any): Observable<ProgramaAcademico> {
    // console.log(id):

    return this.http.get<any>(this.url + "/buscarBy/" + id);
  }


  //agregar un ProgramaAcademico
  addProgramaAcademico(ProgramaAcademico: ProgramaAcademico) {
    return this.http.post(this.url + "/add", ProgramaAcademico);
  }

  //eliminar
  deleteProgramaAcademico(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/eliminar/" + id);
  }


  //modificar un ProgramaAcademico
  editProgramaAcademico(programaAcademico: ProgramaAcademico, id: any) {
    return this.http.post(this.url + "/editar/"+id, programaAcademico);
  }

  agregarListado(programaAcademico: ProgramaAcademico[]){
    return this.http.post(this.url + "/masivo", programaAcademico);
  }
}
