import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalTaskService } from '../global-task.service';
import { LoginResponse } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  // model: LoginModel;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private globalTask: GlobalTaskService
  ) { }


  createForm() {
    this.loginGroup = this.fb.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
      user_type: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
    // this.model = new LoginModel();
  }

  register() {
    this.router.navigate(["/register"]);
  }

  login() {
    this.loginService.login(this.loginGroup.value).subscribe((res: LoginResponse) => {
      if (!res.status) {
        this.globalTask.openDialog({
          status: true,
          content: res.message,
          title: "Login Unsuccessful"
        })
      }
    })
  }

}
