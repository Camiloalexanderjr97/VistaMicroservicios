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
  private url = `${urlArticulo}/prod`;
  // private url2 = `${urlProducto}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getProductos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+"/productos");
  }

  //get un Producto
  getProductoByID(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/findById/" + id);
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
    return this.http.delete<any>(this.url + "/deleteProd/" + id);
  }

  // login(Producto: Producto): Observable<boolean> {
  //   return this.http.post<any>(`${this.url}/login`, Producto);
  // }
 
  //modificar un Producto 
  editProducto(producto: Producto) {
    return this.http.post(this.url + "/editProd/"+producto.id, producto);
  }
  agregarListado(producto: Producto[]){
    console.log("entra a masivo");
    return this.http.post(this.url + "/masivo", producto);
  }
}
