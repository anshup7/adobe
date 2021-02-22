export interface Login {
  user_name: string;
  password: string;
  user_type: string;
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
