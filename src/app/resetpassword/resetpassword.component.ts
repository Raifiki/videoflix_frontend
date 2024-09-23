import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ENVIRONEMENT } from '../../environment/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  @ViewChild('iptPwd') iptElementPwd!: ElementRef;
  @ViewChild('iptPwdConfirm') iptElementPwdCon!: ElementRef;

  password: string = '';
  passwordConfirm: string = '';

  pwdChangePermissionDenied: boolean = false;

  backendUrl = ENVIRONEMENT.backendUrl

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private route: ActivatedRoute, ) {}

  async onSubmit(form:NgForm) {
    // ToDo: get account from query parameter, (ideas: email, token, etc)
    if (this.isPasswordMatching() && form.valid) {
      try {
        let resp: any = await this.changePwd(this.password, this.passwordConfirm);
        this.router.navigate(['/Login'], { queryParams: { email: resp['email'] } });
      } catch (error) {
        console.log(error);
        this.pwdChangePermissionDenied = true;
      }
      // ToDo: Change pwd on Backend and redirect with email as query parameter
    }
  }

  async changePwd(new_password: string, new_passwordConfirm: string) {
    let url = this.backendUrl + '/user/resetpasswordconfirm/';
    let data = {new_password, new_passwordConfirm};
    let [user_id, token] = this.getQueryParams();
    return lastValueFrom(this.http.post(url, data, {params: {user_id, token}}));
  }

  getQueryParams() {
    const queryParams = this.route.snapshot.queryParams;
    let [user_id, token] = (queryParams['token'])? [queryParams['user_id'], queryParams['token']] : ['', ''];
    return [user_id, token];
  }

  toggleShowPassword(){
    if (this.iptElementPwd.nativeElement.type === 'password')
      this.iptElementPwd.nativeElement.type = 'text';
    else
      this.iptElementPwd.nativeElement.type = 'password';
  }

  toggleShowPasswordConfirm(){
    if (this.iptElementPwdCon.nativeElement.type === 'password')
      this.iptElementPwdCon.nativeElement.type = 'text';
    else
      this.iptElementPwdCon.nativeElement.type = 'password';
  }

  isPasswordMatching(): boolean {
    return this.password === this.passwordConfirm && this.password !== '';
  }

}
