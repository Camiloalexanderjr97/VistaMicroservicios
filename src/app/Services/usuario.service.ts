import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Modelos/User";
import { Router } from "@angular/router";
import {urlUser } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private url = `${urlUser}/api/users`;
  private url2 = `${urlUser}/file`;


  constructor(private http: HttpClient, private router: Router) {}

  //getUsuarios
  getUsuario(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  //get un User
  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/" + id);
  }

  //get un User
  getSignatureUser(id: string): Observable<any> {
    return this.http.get<any>(this.url2 + "/id/" + id);
  }

  //agregar un User
  addUser(User: User) {
    return this.http.post(this.url + "/save", User);
  }

  //eliminar
  deleteUser(id: string): Observable<any> {
    // console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/eliminar/" + id);
  }

  login(User: User): Observable<boolean> {
    return this.http.post<any>(`${this.url}/login`, User);
  }

  //modificar un User
  editUser(User: User) {
    return this.http.put(this.url + "/{id}", User);
  }
}
