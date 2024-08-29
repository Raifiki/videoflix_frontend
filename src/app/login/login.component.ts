import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('iptPwd') iptElement!: ElementRef;
  loginFailed: boolean = false;

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.setFormData()
  }
  
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['email']) this.email = queryParams['email'];
  }

  onSubmit(form:NgForm){
    if (true){
      // ToDo: Check Login Data with Server and if correct save to local storate and redirect to Video dashboard, if not show error
      this.handleLocalStorageData();
    }
    else {
      this.loginFailed = true;
      form.reset();
    }
  }

  handleLocalStorageData(){
    if(this.rememberMe)
      this.storeLoginData(this.email, this.password);
     else 
      localStorage.removeItem('loginData');
  }
  toggleShowPassword(){
    if (this.iptElement.nativeElement.type === 'password')
      this.iptElement.nativeElement.type = 'text';
    else
      this.iptElement.nativeElement.type = 'password';
  }

  storeLoginData(email: string, password: string){
    let loginData = {email, password};
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

  getLoginData():null | string {
    return localStorage.getItem('loginData');
  }

  setFormData(){
    let loginData = this.getLoginData();
    if (loginData){
      let {email, password} = JSON.parse(loginData);      
      this.email= email;
      this.password= password;
      this.rememberMe= true;
    }
  }
}
