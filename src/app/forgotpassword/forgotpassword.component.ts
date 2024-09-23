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

  constructor(private http: HttpClient) { }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        let resp: any = await this.sendResetPwdEmail(form.value.email);
        console.log(resp);
      } catch (error) {
        console.log(error);
        this.emailNotRegistered = true;
      }
    }
  }

  async sendResetPwdEmail(email: string) {
    let url = this.backendUrl + '/user/resetpassword/'; 
    let data = {email};
    return lastValueFrom(this.http.post(url, data));
  }


}
