import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { urlUser } from 'environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url2 = `${urlUser}/file`;

  constructor(private http: HttpClient, private router: Router) { }

  //getUsuarios
  getFile(): Observable<File[]> {
    return this.http.get<File[]>(this.url2);
  }


}


