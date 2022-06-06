import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlArticulo } from "../../environments/environment";
import {Articulos} from "../Modelos/Articulos";

@Injectable({
  providedIn: "root",
})
export class ArticuloService {
  private url = `${urlArticulo}/art`;
  // private url2 = `${urlArticulo}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getArticuloss
  getArticulos(): Observable<Articulos[]> {
    return this.http.get<Articulos[]>(this.url+"/Articulos");
  }

  //get un Articulo
  getArticuloById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/findById/" + id);
  }

  // //get un Articulo
  // getSignatureArticulo(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Articulo
  addArticulo(Articulo: Articulos) {
    return this.http.post(this.url + "/addArticulo", Articulo);
  }

  //eliminar
  deleteArticulo(id: string): Observable<any> {
    return this.http.delete<any>(this.url + "/deleteArt/" + id);
  }

  // login(Articulo: Articulo): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Articulo);
  // }

  //modificar un Articulo
  editArticulo(Articulo: Articulos) {
    return this.http.put(this.url + "/editArt/", Articulo);
  }
  
  agregarListado(Articulo: Articulos[]){
    return this.http.post(this.url + "/masivo", Articulo);
  }
}
