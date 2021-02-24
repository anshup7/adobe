import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private fb: FormBuilder,
    private dbService: DummyDbService,
    private globalTask: GlobalTaskService) {}

  ngOnInit() {
    this.createForm();
    this.registerFg.get("user_type").valueChanges.subscribe((res) => {
      if (res === "company") {
        this.registerFg.get("associated_company").setValue(null);
        this.registerFg.get("associated_company").clearValidators();
        this.registerFg.get("associated_company").updateValueAndValidity();
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
  }

  createForm() {
    this.registerFg = this.fb.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
      user_type: ["candidate", Validators.required],
      associated_company: [null],
      name: [null, Validators.required],
    });
  }

  onSubmit() {
    let modelObj = new RegisterModel();
    modelObj.fields = this.registerFg.value;
    this.dbService.registerUser(modelObj.values).subscribe((res: RegisterResponse) => {
      /*
       in case user doesnt interacts with the dialog and resubmits a valid username
      */
      this.globalTask.resetDialog();
      console.log(res);
    }, error => {
      this.globalTask.openDialog(
        {
          title: "Registration Error",
          content: error.message,
          status: true
        }
      );
    })
  }
}
