import { Injectable } from '@angular/core';
import { environment, urlUser } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/Modelos/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private URL = `${urlUser}/user`;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.getToken()}` });

  constructor(private http: HttpClient, private router: Router) { }

  getAllCustomers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  getCustomer(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/save`, user, { headers: this.headers });
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${user.id}`, user, { headers: this.headers });
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.URL}/${id}`, { headers: this.headers });
  }

//============================================================

  signIn(user: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, user);
  }

  signOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['login']);
    });
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(`${this.URL}/logout`, { title: 'Angular POST Request Example' });
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('user');
  }

  getRole() {
    return localStorage.getItem('user.role');
  }

  
}
