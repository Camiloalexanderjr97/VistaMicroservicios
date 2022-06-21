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

  private url = `${urlArticulo}/lib`;
  // private url2 = `${urlArticulo}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getLibross
  getLibreria(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.url+"/libros");
  }

  //get un Libros
  getLibrosById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/findById/" + id);
  }

  // //get un Libros
  // getSignatureLibros(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Libros
  addLibros(Libros: Libros) {
    return this.http.post(this.url + "/addLibro", Libros);
  }

  //eliminar
  deleteLibros(id: string): Observable<any> {
    return this.http.delete<any>(this.url + "/deleteLib/" + id);
  }

  // login(Libros: Libros): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Libros);
  // }

  //modificar un Libros
  editLibros(libros: Libros) {
    console.log("entra---");
    return this.http.post(this.url + "/editLibro/"+libros.id_libro, libros);
  }
  agregarListado(libro: Libros[]){
    return this.http.post(this.url + "/masivo", libro);
  }
}
