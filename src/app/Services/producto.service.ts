import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {urlArticulo } from "../../environments/environment";
import {Producto} from "../Modelos/Producto";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  private url = `${urlArticulo}/prod/productos`;
  // private url2 = `${urlProducto}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getProductos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  //get un Producto
  getProducto(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
  }

  // //get un Producto
  // getSignatureProducto(id: string): Observable<any> {
  //   return this.http.get<any>(this.url2 + "/id/" + id);
  // }

  //agregar un Producto
  addProducto(Producto: Producto) {
    return this.http.post(this.url + "/addProd", Producto);
  }

  //eliminar
  deleteProducto(id: string): Observable<any> {
    console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/" + id);
  }

  // login(Producto: Producto): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Producto);
  // }

  //modificar un Producto
  editProducto(Producto: Producto) {
    return this.http.put(this.url + "/", Producto);
  }
}
