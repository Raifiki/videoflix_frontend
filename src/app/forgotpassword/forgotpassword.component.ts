import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

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


  onSubmit(form: NgForm) {
    console.log('submitted');
  }

}
