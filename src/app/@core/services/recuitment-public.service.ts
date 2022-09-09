import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobRegisterPublic } from '../models/jobRegisterPublic';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  urlAdmin: string;
  urlUser: string;


  constructor(private http: HttpClient) {
    this.urlAdmin = 'http://localhost:9090/api/admin';
    this.urlUser = 'http://localhost:9090/api/public';
  }

  getAllJob(): Observable<any> {
    return this.http.get<any>(this.urlUser+'/get-all-job-public');
  }

  getDetailJobById(id: number): Observable<any> {
    return this.http.get<any>(this.urlUser+'/job/'+id);
  }

  registerJob(rjob: JobRegisterPublic): Observable<any> {
    return this.http.post<any>(this.urlUser+'/register-job-public',rjob);
  }
}
