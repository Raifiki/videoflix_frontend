import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

import { ENVIRONEMENT } from '../../environment/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  backendUrl = ENVIRONEMENT.backendUrl;

  emailNotRegistered: boolean = false;
  emailSend: boolean = false;
  waitForServerResponse: boolean = false;

  constructor(private http: HttpClient) { }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        this.waitForServerResponse = true;
        let resp: any = await this.sendResetPwdEmail(form.value.email);
        this.waitForServerResponse = false;
        this.emailNotRegistered = false;
        this.emailSend = true;
      } catch (error) {
        this.emailSend = false;
        this.emailNotRegistered = true;
        this.waitForServerResponse = false;
      }
    }
  }

  async sendResetPwdEmail(email: string) {
    let url = this.backendUrl + '/user/resetpassword/'; 
    let data = {email};
    return lastValueFrom(this.http.post(url, data));
  }


}
