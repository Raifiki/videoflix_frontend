import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit(form:NgForm) {
    // ToDo: get account from query parameter, (ideas: email, token, etc)
    if (this.isPasswordMatching()) {
      console.log('submitted reset pwd');
      this.router.navigate(['/Login'], { queryParams: { email: 'leo@web.de' }});
      localStorage.removeItem('loginData');
      // ToDo: Change pwd on Backend and redirect with email as query parameter
    }
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
