import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PdfCreateResponse } from './dashboard/dashboard.model';
import { GlobalTaskService } from './global-task.service';
import { Login, LoginResponse } from './login/login.model';
import { Register, RegisterModel, RegisterResponse } from './register/register.model';

@Injectable({
  providedIn: "root",
})
export class DummyDbService {
  registerModel: RegisterModel;

  constructor(private router: Router,
    private globalTask: GlobalTaskService,
    private http: HttpClient) {}
  private data = {
    user: {
      anshup7: {
        name: "Anshuman Upadhyay",
        user_type: "candidate",
        user_name: "anshup7",
        password: "abc123",
        associated_company: "Google",
      },
    },
    current_logged_in: null,
    pdf: {
      /*
        g1: { // created by company
          for_users: {
            anshup7: {
            url: "abc"
          },
          anshup8: {

          }
          },
          comments: {
            abc: {
              from: "g1",
              to: "anshup7",
              text: "any"
            }
          }
        }
      */
    },
  };

  registerUser(data: Register): Observable<RegisterResponse> {
    this.syncData();
    this.registerModel = new RegisterModel();
    this.registerModel.fields = data;
    return this.storeData(this.registerModel);
  }

  private storeData(data: RegisterModel): Observable<RegisterResponse> {
    const values = data.values;
    if (values.user_name in this.data.user) {
      return throwError({ message: "This user name has already been taken" });
    }
    this.data.user[`${values.user_name}`] = values;
    localStorage.setItem("data", JSON.stringify(this.data));
    this.loggedInUser = `${values.user_name}`;
    return of({
      status: true,
      message: "Registration Done!",
      ...values,
    });
  }

  get currentLoggedInUser() {
    if (!this.data.current_logged_in) {
      this.router.navigate(["/login"]);
    }
    return of(this.data.current_logged_in);
  }

  private set loggedInUser(prop: string) {
    this.data.current_logged_in = this.data.user[prop];
    this.globalTask.loggedIn.next(true);
  }

  logout() {
    this.data.current_logged_in = null;
    this.globalTask.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  private syncData() {
    try {
      let parsed = JSON.parse(localStorage.getItem("data"));
      if (parsed) {
        this.data = parsed;
      }
    } catch {
      console.log("Nothing to sync");
    }
  }

  login(data: Login): Observable<LoginResponse> {
    this.syncData();
    if (
      !this.data.user[`${data.user_name}`] ||
      this.data.user[`${data.user_name}`].password !== data.password
    ) {
      return of({
        status: false,
        message: "No User present with the given credentials, Please register.",
      });
    } else {
      this.loggedInUser = `${data.user_name}`;
      return of({
        status: true,
        message: "Logged In",
        ...this.data[`${data.user_name}`],
      });
    }
  }

  companyCandidates(companyName: string) {
    this.syncData();
    let users: RegisterModel[] = [];
    for (let each of Object.keys(this.data.user)) {
      if (
        (this.data.user[each].user_type == "candidate") &&
        ((this.data.user[each].associated_company).toLowerCase() == companyName.toLowerCase())
      ) {

        let model = (new RegisterModel().fields = this.data.user[each]);
        users.push(model);
      }

    }
     if (users.length > 0) {
       return of({
         status: true,
         data: users,
       });
     } else {
       return of({
         status: false,
         data: [],
       });
     }
  }

  createPdf(data: {users: string[]}, creator: string) {
    let sendingData = {
      user_names: data.users,
      creator: creator
    };
    return this.http.post(`${environment.api}/api/pdf/create`, sendingData);
  }

  syncPdf(data: PdfCreateResponse[]) {
    this.syncData();
    for (let eachPdf of data) {
      if (eachPdf.by_user in this.data.pdf) {
        this.data.pdf[eachPdf.by_user].for_users[eachPdf.for_user] = {
          url: eachPdf.url
        }
      } else {
        this.data.pdf[eachPdf.by_user] = {for_users: {

        }};
        this.data.pdf[eachPdf.by_user].for_users[eachPdf.for_user] = {
          url: eachPdf.url,
        };

      }
    }
    localStorage.setItem("data", JSON.stringify(this.data));
  }
}
