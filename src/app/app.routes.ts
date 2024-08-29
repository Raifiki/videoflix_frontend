import { Routes } from '@angular/router';

// import custom components
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [
    {path: '',component: LandingpageComponent},
    {path: 'Login',component: LoginComponent},
    {path: 'SignUp',component: SignupComponent},
    {path: 'ForgotPassword',component: ForgotpasswordComponent},
    {path: 'ResetPassword',component: ResetpasswordComponent},
];
