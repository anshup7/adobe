import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Login, LoginResponse } from './login/login.model';
import { Register, RegisterModel, RegisterResponse } from './register/register.model';

@Injectable({
  providedIn: 'root'
})
export class DummyDbService {
  registerModel: RegisterModel;

  constructor() { }
  private data = {
    user: {
      // anshup7_abc123: {
      //   name: "Anshuman Upadhyay",
      //   user_type: "candidate",
      //   user_name: "anshup7",
      //   password: "abc123",
      //   associated_company: "google" or null
      // }
    }
  }

  registerUser(data: Register): Observable<RegisterResponse> {
    this.registerModel = new RegisterModel();
    this.registerModel.fields = data;
    return this.storeData(this.registerModel);
  }

  private storeData(data: RegisterModel): Observable<RegisterResponse> {
    const values = data.values;
    if (values.user_name in this.data.user) {
      return throwError({message: "This user name has already been taken"});
    }
      this.data.user[`${values.user_name}`] = values;
    return of({
      status: true,
      message: "Registration Done!",
      ...values,
    });
  }

  login(data: Login): Observable<LoginResponse> {
    if (!this.data[`${data.user_name}`] || this.data[`${data.user_name}`].password !== data.password) {
      return of({
        status: false,
        message: "No User present with the given credentials, Please register.",
      });
    } else {
      return of({
        status: true,
        message: "Logged In",
        ...this.data[`${data.user_name}_${data.password}`],
      });
    }
  }
}
