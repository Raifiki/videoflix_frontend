import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// import environment variables
import { ENVIRONEMENT } from '../../environment/environment';
import log from 'video.js/dist/types/utils/log';
import { UserService } from '../services/user.service';

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

  backendURL = ENVIRONEMENT.backendUrl;

  waitForServerResponse: boolean = false;
  accountNotVerified: boolean = false;

  userService = inject(UserService)

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient) {}
  
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    (queryParams['email'])? this.email = queryParams['email'] : this.setFormData();
  }

  async onSubmit(form:NgForm){
    if (form.valid) {
      try {
        this.waitForServerResponse = true;
        this.accountNotVerified = false;
        this.loginFailed = false;
        let resp: any = await this.loginWithEmailPwd(this.email, this.password);
        this.handleLocalStorageData(resp);
        this.userService.setActiveUser(resp);
        this.router.navigate(['/Dashboard']);
      } catch (error) {
        let err = error as HttpErrorResponse;
        (err.error.detail === 'email adress not verified')? this.accountNotVerified = true : this.loginFailed = true;
        this.waitForServerResponse = false;
      }
    }
    else {
      this.loginFailed = true;
      form.reset();
    }
  }


  async loginWithEmailPwd(email: string, password: string){
    let url = this.backendURL + '/user/login/';
    let data = {email, password};
    return lastValueFrom(this.http.post(url, data));
  }

  handleLocalStorageData(credentials: {email:string ; token: string}){
    if(this.rememberMe) this.storeLoginData(this.email, this.password);
    else localStorage.removeItem('loginData');
    this.storeCredentials(credentials)
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

  storeCredentials(credentials: {email:string ; token: string}){
    localStorage.setItem('credentials', JSON.stringify(credentials));
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
