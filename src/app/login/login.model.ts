export interface Login {
  user_name: string;
  password: string;
  user_type: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  name?: string;
  user_type?: string;
  password?: string;
  user_name?: string;
  associate_company?: string;
}
export class LoginModel {
  private userName: string;
  private password: string;
  private userType: string;
  get values() {
    return  {
      user_name: this.userName,
      password: this.password,
      user_type: this.userType
    }
  }

  set UserName(val: string) {
    this.userName = val;
  }

  set Password(val: string) {
    this.password = val;
  }

  set UserType(val: string) {
    this.userType = val;
  }
}
