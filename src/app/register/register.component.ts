import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DummyDbService } from '../dummy-db.service';
import { GlobalTaskService } from '../global-task.service';
import { RegisterModel, RegisterResponse } from './register.model';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerFg: FormGroup;
  nameLabelText = new BehaviorSubject<string>("Name");
  showAC = new BehaviorSubject<boolean>(true); //hides or unhides associated_company
  passwordMismatch = new BehaviorSubject<boolean>(false); //shows mismatch error

  constructor(
    private fb: FormBuilder,
    private dbService: DummyDbService,
    private globalTask: GlobalTaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.registerFg.get("user_type").valueChanges.subscribe((res) => {
      if (res === "company") {
        this.registerFg.get("associated_company").setValue(null);
        this.registerFg.get("name").setValue(null);
        this.registerFg.get("associated_company").clearValidators();
        this.registerFg.get("associated_company").updateValueAndValidity();
        this.registerFg.get("name").updateValueAndValidity();
        this.nameLabelText.next("Company Name");
        this.showAC.next(false);
      } else {
        this.registerFg
          .get("associated_company")
          .setValidators(Validators.required);
        this.registerFg.get("associated_company").updateValueAndValidity();
        this.nameLabelText.next("Name");
        this.showAC.next(true);
      }
    });

    combineLatest([this.registerFg.get("password").valueChanges,
    this.registerFg.get("confirm_password").valueChanges])
    .subscribe(([pwd, cpwd]) => {
      if (pwd !== cpwd) {
        this.passwordMismatch.next(true);
        this.registerFg.get("confirm_password").setErrors({ invalid: true });
      } else {
        this.passwordMismatch.next(false);
        this.registerFg.get("confirm_password").setErrors(null);
      }
    });
  }

  createForm() {
    this.registerFg = this.fb.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
      user_type: ["candidate", Validators.required],
      associated_company: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  onSubmit() {
    let modelObj = new RegisterModel();
    modelObj.fields = this.registerFg.value;
    this.dbService.registerUser(modelObj.values).subscribe(
      (res: RegisterResponse) => {
        /*
       in case user doesnt interacts with the dialog and resubmits a valid username
      */
        this.globalTask.resetDialog();
        this.router.navigate(["/dashboard"]);
      },
      (error) => {
        this.globalTask.openDialog({
          title: "Registration Error",
          content: error.message,
          status: true,
        });
      }
    );
  }
}
