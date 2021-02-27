import { Component, OnInit } from '@angular/core';
import { DummyDbService } from '../dummy-db.service';
import { GlobalTaskService } from '../global-task.service';
import { RegisterModel } from '../register/register.model';
import { LoggedInUser, PdfCreateResponse, PdfDocument, User } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private globalTask: GlobalTaskService,
    private dummyDb: DummyDbService) { }
  currentUser: LoggedInUser;
  candidateModels: User[];
  selectedUsers: string[];
  documentModel: PdfDocument;
  text: string;
  ngOnInit(): void {
    this.dummyDb.currentLoggedInUser.subscribe((res: LoggedInUser) => {
      this.currentUser = res;
      if (this.currentUser && this.currentUser.user_type === "company") {

        this.loadCompanyCandidates();
      }
    });

  }

  loadCompanyCandidates() {
    this.dummyDb.companyCandidates(this.currentUser.name)
    .subscribe((res: {status: boolean; data: User[]}) => {
      if (res.status) {
            this.documentModel = new PdfDocument();
        this.candidateModels = res.data; // this is no model, it is internally converted by get
      }
    }, error => {
      this.candidateModels = [];
      this.globalTask.openDialog({
        status: true,
        title: "No Candidates",
        content: "No Candidates are present for your company"
      })
    })
  }

  createPdf() {
    this.dummyDb.createPdf(this.documentModel.values, this.currentUser.name).subscribe((res: PdfCreateResponse) => {
      this.globalTask.resetDialog();

    }, error => {
      this.globalTask.openDialog({
        status: true,
        content: JSON.stringify(error),
        title: "Pdf Create Error"
      })
    });
  }

}
