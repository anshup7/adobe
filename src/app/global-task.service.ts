import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
export interface Dialog {
  status: boolean;
  title: string;
  content: string;
}
@Injectable({
  providedIn: "root",
})

export class GlobalTaskService {
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor() {}
  private dialog = new BehaviorSubject<Dialog>({
    status: false,
    title: "",
    content: ""
  });

  openDialog(data: Dialog) {
    this.dialog.next(data);
  };

  resetDialog() {
    this.dialog.next({
      status: false,
      title: "",
      content: ""
    });
  }

  get dialogSubscription() {
    return this.dialog;
  }
}
