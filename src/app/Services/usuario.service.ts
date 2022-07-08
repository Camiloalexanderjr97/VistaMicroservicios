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
  private url = `${urlUser}/auth`;


  constructor(private http: HttpClient, private router: Router) {}

  //getUsuarios
  getUsuario(): Observable<User[]> {
    return this.http.get<User[]>(this.url+"/users");
  }

  //get un User
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/users/buscar/" + id);
  }


  //agregar un User
  addUser(User: User) {
    return this.http.post(this.url + "/nuevo", User);
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
  editUser(user: User) {
    return this.http.post(this.url + "/users/editar/"+user.id, user);
  }
}
