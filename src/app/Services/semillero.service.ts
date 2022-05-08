import { Semillero } from '../Modelos/Semillero';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlGrupo } from "../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class SemilleroService {
  private url = `${urlGrupo}/semillero`;
  // private url2 = `${urlSemillero}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getSemilleros
  getSemillero(): Observable<Semillero[]> {
    return this.http.get<Semillero[]>(this.url+"/listSemillero");
  }

  //get un Semillero
  getSemilleroById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/getSemillero/" + id);
  }

  // //get un Semillero
  // getSignatureSemillero(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Semillero
  addSemillero(Semillero: Semillero) {
    return this.http.post(this.url + "/guardarSemillero", Semillero);
  }

  //eliminar
  deleteSemillero(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/delete/" + id);
  }

  // login(Semillero: Semillero): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Semillero);
  // }

  //modificar un Semillero
  editSemillero(Semillero: Semillero) {
    return this.http.put(this.url + "/update/"+Semillero.id, Semillero);
  }
  agregarListado(semillero: Semillero[]){
    return this.http.post(this.url + "/masivo", semillero);
  }
}
