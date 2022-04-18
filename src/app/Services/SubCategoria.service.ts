import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlArticulo } from "../../environments/environment";
import {subCategorias} from "../Modelos/SubCategorias";

@Injectable({
  providedIn: "root",
})
export class SubCategoriaService {
  private url = `${urlArticulo}/art/Articulos`;
  // private url2 = `${urlSubCategoria}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getSubCategoriass
  getSubCategorias(): Observable<subCategorias[]> {
    return this.http.get<subCategorias[]>(this.url);
  }

  //get un SubCategoria
  getSubCategoriaById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
  }

  // //get un SubCategoria
  // getSignatureSubCategoria(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un SubCategoria
  addSubCategoria(SubCategoria: subCategorias) {
    return this.http.post(this.url + "/addSubCategoria", SubCategoria);
  }

  //eliminar
  deleteSubCategoria(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/" + id);
  }

  // login(SubCategoria: SubCategoria): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, SubCategoria);
  // }

  //modificar un SubCategoria
  editSubCategoria(SubCategoria: subCategorias) {
    return this.http.put(this.url + "/", SubCategoria);
  }
}
