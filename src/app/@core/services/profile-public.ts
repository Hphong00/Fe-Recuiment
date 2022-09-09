import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePublickService {

  urlAdmin: string;
  urlUser: string;


  constructor(private http: HttpClient) {
    this.urlAdmin = 'http://localhost:9090/api/admin';
    this.urlUser = 'http://localhost:9090/api/public';
  }

  getProfile(username: any): Observable<any> {
    return this.http.get<any>(this.urlUser+'/user/{userName}?userName=' + username)
  }
}
