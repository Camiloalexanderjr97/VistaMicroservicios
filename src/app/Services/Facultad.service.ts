import { Facultad } from './../Modelos/Facultad';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlProgramaAcedmico } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  private url = `${urlProgramaAcedmico}/api/facultad`;
  // private url2 = `${urlProgramaAcedmico}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getFacultads
  getFacultad(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.url);
  }

  //get un Facultad
  getFacultadById(id: String): Observable<Facultad> {
    return this.http.get<Facultad>(this.url + "/" + id);
  }

    getFacultadByName(nombre: string): Observable<Facultad> {
    return this.http.get<Facultad>(this.url + "/" + nombre);
  }


  //agregar un Facultad
  addFacultad(Facultad: Facultad) {
    return this.http.post(this.url + "/add", Facultad);
  }

  //eliminar
  deleteFacultad(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/eliminar/" + id);
  }


  //modificar un Facultad
  editFacultad(Facultad: Facultad) {
    return this.http.post(this.url + "/editar/"+Facultad.id, Facultad);
  }
  agregarListado(facultad: Facultad[]){
    return this.http.post(this.url + "/masivo", facultad);
  }
}
