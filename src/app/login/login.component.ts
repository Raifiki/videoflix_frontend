import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import custom components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

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

  onSubmit(){
    console.log('submitted');
  }

  toggleShowPassword(){
    if (this.iptElement.nativeElement.type === 'password')
      this.iptElement.nativeElement.type = 'text';
    else
      this.iptElement.nativeElement.type = 'password';
  }
}
