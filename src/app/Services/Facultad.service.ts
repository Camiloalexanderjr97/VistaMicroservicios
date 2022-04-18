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
  getFacultadById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
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
    return this.http.put(this.url + "/", Facultad);
  }
}