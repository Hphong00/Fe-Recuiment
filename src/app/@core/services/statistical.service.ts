import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};
@Injectable({
  providedIn: 'root',
})
export class StatisticalService {
  urlAdmin: string;
  urlUser: string;


  constructor(private http: HttpClient) {
    this.urlAdmin = 'http://localhost:9090/api/admin';
    this.urlUser = 'http://localhost:9090/api/public';
  }

  getStatistical(stati: any): Observable<any> {
    return this.http.post<any>(this.urlAdmin+'/statistical',stati,httpOptions);
  }
}
