import { Component, OnInit } from '@angular/core';
import { DummyDbService } from '../dummy-db.service';
import { GlobalTaskService } from '../global-task.service';
import { LoggedInUser, PdfCreateResponse, PdfDocument, User } from './dashboard.model';
import { ViewSDKClient } from "./view-sdk.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pdf: any;
  userNames: string[];

  constructor(private globalTask: GlobalTaskService,
    private dummyDb: DummyDbService,
    private viewSDKClient: ViewSDKClient) { }
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
      this.loadPdfs();
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

  private initializePdf() {
    if (this.currentUser.user_type === "candidate") {
        this.viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            this.viewSDKClient.previewFile(`pdf-${this.currentUser.user_name}`, {
              /* Pass the embed mode option here */
              // embedMode: 'LIGHT_BOX',
              showAnnotationTools: true,
              enableFormFilling: true,
              url: this.pdf.url,
              document_name: `${this.currentUser.user_name}.pdf`
            });
            this.viewSDKClient.registerEventsHandler();
            this.viewSDKClient.registerSaveApiHandler();
             this.viewSDKClient.enableCollaborativeSettings({
               userProfile: {
                 name: this.currentUser.user_name,
               },
             });

        });
    } else if (this.currentUser.user_type === "company") {
      this.userNames = Object.keys(this.pdf.for_users);
     this.viewSDKClient.ready().then(() => {
       for (let each of this.userNames) {
         /* Invoke file preview */
         this.viewSDKClient.previewFile(`pdf-${each}`, {
           /* Pass the embed mode option here */
           // embedMode: 'LIGHT_BOX',
           showAnnotationTools: true,
           enableFormFilling: true,
           url: this.pdf.for_users[each].url,
           document_name: `${each}.pdf`,
         });
         this.viewSDKClient.registerEventsHandler();
         this.viewSDKClient.registerSaveApiHandler();
         this.viewSDKClient.enableCollaborativeSettings({
           userProfile: {
             name: this.currentUser.user_name
           }
         })
       }
     });
    }
  }

  loadPdfs() {
    this.dummyDb.getPdf({type: this.currentUser.user_type,
      user_name: this.currentUser.user_name}).subscribe((res: any) => {
        if (!res) {
          this.globalTask.openDialog({
            status: true,
            content: "No Pdfs present for the current user",
            title: "PDF not Found"
          });
        } else {
          this.globalTask.resetDialog();
          console.log("Got Pdfs", res);
          this.pdf = res;
          this.initializePdf()
        }
      }, error => {
        this.globalTask.openDialog({
          status: true,
          content: error.message,
          title: "PDF not Found",
        });
      });
  }

  createPdf() {
    this.dummyDb.createPdf(this.documentModel.values, this.currentUser.user_name).subscribe((res: {pdfs: PdfCreateResponse[]}) => {
      this.globalTask.resetDialog();
      this.dummyDb.syncPdf(res.pdfs);
      this.loadPdfs();
    }, error => {
      this.globalTask.openDialog({
        status: true,
        content: JSON.stringify(error),
        title: "Pdf Create Error"
      })
    });
  }

}
