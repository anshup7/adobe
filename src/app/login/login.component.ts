import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }


  createForm() {
    this.login = this.fb.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
      user_type: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
