import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization: 'Bearer ' + localStorage.getItem('auth-token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  urlAdmin: string;
  urlUser: string;


  constructor(private http: HttpClient) {
    this.urlAdmin = 'http://localhost:9090/api/admin';
    this.urlUser = 'http://localhost:9090/api/public';
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlAdmin+'/user', httpOptions);
  }

  getAllUserJeForm(seachUser: any): Observable<any> {
    return this.http.post<any>(this.urlAdmin+'/user-seach', seachUser, httpOptions);
  }

  addUser(user: Users): Observable<any> {
    return this.http.post<any>(this.urlAdmin+'/add-user-je', user, httpOptions);
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.urlUser+'/update-user', user, httpOptions);
  }

  changeThePassword(form: any): Observable<any> {
    return this.http.put<any>(this.urlUser+'/change-the-password', form, httpOptions);
  }

  deactivateUser(id: any): Observable<any> {
    return this.http.put<any>(this.urlAdmin+'/deactivate-user-je', id, httpOptions);
  }
  getNumberUserJe(): Observable<any> {
    return this.http.get<any>(this.urlAdmin+'/number-user-je');
  }
}
