import { Departamento } from './../Modelos/Departamento';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlGrupo } from "../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class DepartamentoService {
  private url = `${urlGrupo}/departamento`;
  // private url2 = `${urlDepartamento}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getDepartamentos
  getDepartamento(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url+"/listDepartamento");
  }

  //get un Departamento
  getDepartamentoById(id: String): Observable<any> {
    return this.http.get<any>(this.url + "/getDepartamento/" + id);
  }

  // //get un Departamento
  // getSignatureDepartamento(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Departamento
  addDepartamento(Departamento: Departamento) {
    return this.http.post(this.url + "/GuardarDepartamento", Departamento);
  }

  //eliminar
  deleteDepartamento(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/delete/" + id);
  }

  // login(Departamento: Departamento): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Departamento);
  // }

  //modificar un Departamento
   
  editDepartamento(departamento: any,id: any) {
    return this.http.post(`${this.url}/update/${id}`, Departamento,{headers: {'Content-Type': 'application/json; charset=utf-8'}});
  }
}
