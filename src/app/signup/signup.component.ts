import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, timeout } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ENVIRONEMENT } from '../../environment/environment';
import { query } from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('iptPwd') iptElementPwd!: ElementRef;
  @ViewChild('iptPwdConfirm') iptElementPwdCon!: ElementRef;

  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  backendUrl = ENVIRONEMENT.backendUrl;

  waitForServerResponse: boolean = false;
  emailSend:boolean = false;
  emailAlreadyRegistered: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['email']) this.email = queryParams['email'];
  }

  async onSubmit(form: NgForm) {
    if(this.isPasswordMatching() && form.valid) {
      try {
        this.waitForServerResponse = true;
        this.emailAlreadyRegistered = false;
        let resp = await this.createNewAccount(this.email, this.password, this.passwordConfirm);
        this.waitForServerResponse = false;
        this.emailSend = true;
        setTimeout(() => this.router.navigate(['/Login'], {queryParams: {email: this.email}}), 10000); 
      } catch (error) {
        this.waitForServerResponse = false;
        this.emailAlreadyRegistered = true;
      }
    }
  }

  async createNewAccount(email: string, password: string, passwordConfirm: string) {
    let url = this.backendUrl + '/user/';
    let data = {email, password, passwordConfirm};
    return lastValueFrom(this.http.post(url, data));
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

  clearEmailIsRegistered() {
    this.emailAlreadyRegistered = false;
  }

}
