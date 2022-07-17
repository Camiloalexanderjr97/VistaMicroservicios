import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlGrupo } from "../../environments/environment";
import {Grupo} from "../Modelos/Grupo";

@Injectable({
  providedIn: "root",
})
export class GrupoService {
  private url = `${urlGrupo}/grupo`;
  // private url2 = `${urlGrupo}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getGrupos
  getGrupo(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.url+"/listGrupo");
  }

  //get un Grupo
  getGrupoById(id: String): Observable<any> {
    return this.http.get<any>(this.url + "/getGrupo/" + id);
  }

  // //get un Grupo
  // getSignatureGrupo(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Grupo
  addGrupo(Grupo: Grupo) {
    return this.http.post(this.url + "/guardarGrupo", Grupo);
  }

  //eliminar
  deleteGrupo(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/delete/" + id);
  }

  // login(Grupo: Grupo): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Grupo);
  // }

  //modificar un Grupo
  editGrupo(grupo: any) {
    return this.http.post(this.url + "/update/"+grupo.id, Grupo);
  }
}
