import { Injectable } from '@angular/core';
import { Login, LoginResponse } from './login.model';
import { DummyDbService } from '../dummy-db.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private dummyDb: DummyDbService) { }

  login(data: Login): Observable<LoginResponse> {
    return this.dummyDb.login(data);
  }
}
