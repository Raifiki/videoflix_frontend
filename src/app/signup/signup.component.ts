import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

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

  onSubmit(form: NgForm) {
    if(this.isPasswordMatching()){
      console.log('submit', form.value);
      // ToDo: Send Email and Password to Server and create new User
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
