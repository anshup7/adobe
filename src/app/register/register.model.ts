export interface Register {
  name: string;
  user_name: string;
  password: string;
  user_type: string;
  associated_company: string;
}

export interface RegisterResponse {
  name: string;
  user_name: string;
  password: string;
  user_type: string;
  associated_company: string;
  status: boolean;
  message: string;
}

export class RegisterModel {
  private name: string;
  private userName: string;
  private password: string;
  private userType: string;
  private associatedComapany: string;

  get values() {
    return {
        name: this.name,
        user_name: this.userName,
        password: this.password,
        user_type: this.userType,
        associated_company: this.associatedComapany
      }

  }

  set fields(obj) {
    this.name = obj.name,
    this.userName = obj.user_name,
    this.password = obj.password,
    this.userType = obj.user_type
    this.associatedComapany = obj.associated_company
  }

}
