import { Component, OnInit } from '@angular/core';
import { DummyDbService } from './dummy-db.service';
import { Dialog, GlobalTaskService } from './global-task.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "HRSP(adobe)";
  constructor(public globalTask: GlobalTaskService, private dummyDb: DummyDbService) {}
  dialog = {
    status: false,
    title: "",
    content: "",
  };
  ngOnInit() {
    this.globalTask.dialogSubscription.subscribe((res: Dialog) => {
      this.dialog = res;
    });
  }
  logout() {
    this.dummyDb.logout();
  }
}
