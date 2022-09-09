import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../models/company';

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
export class CompanyService {
  urlAdmin: string;
  urlUser: string;


  constructor(private http: HttpClient) {
    this.urlAdmin = 'http://localhost:9090/api/admin';
    this.urlUser = 'http://localhost:9090/api/public';
  }

  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.urlAdmin + '/company/' + companyId, httpOptions);
  }

  updateCompany(company: any): Observable<any> {
    return this.http.put<any>(this.urlAdmin + '/update-company', company, httpOptions);
  }
}
