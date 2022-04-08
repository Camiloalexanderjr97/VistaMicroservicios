import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlArticulo } from "../../environments/environment";
import {Libros} from "../Modelos/Libros";

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private url = `${urlArticulo}/lib/libros`;
  // private url2 = `${urlArticulo}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getLibross
  getLibreria(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.url);
  }

  //get un Libros
  getLibrosById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
  }

  // //get un Libros
  // getSignatureLibros(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Libros
  addLibros(Libros: Libros) {
    return this.http.post(this.url + "/addLibros", Libros);
  }

  //eliminar
  deleteLibros(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/{id}" + id);
  }

  // login(Libros: Libros): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Libros);
  // }

  //modificar un Libros
  editLibros(Libros: Libros) {
    return this.http.put(this.url + "/{id}", Libros);
  }
}
