export interface LoggedInUser {
  name: string;
  user_type: string;
  user_name: string;
  password: string;
  associated_company: string;
}

export interface User {
  name: string;
  user_type: string;
  user_name: string;
  password: string;
  associated_company: string;
}

export interface PdfCreateResponse {
  url: string;
  for_user: string;
  by_user: string;
  status: string; // draft, finalized(by the company), approved_by_the_user, approved_by_the_company,approved, signed
}

export class PdfDocument {
  users: string[];
  constructor() {
    this.users = [];
  }

  get values(): {users: string[]} {
    return {
      users: this.users,
    };
  }
}
