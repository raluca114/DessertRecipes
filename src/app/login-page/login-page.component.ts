import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isChecked: boolean = false;
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService:AuthenticationService,
     private router:Router,
     private toast:HotToastService
     ) {}

  ngOnInit(): void {
    this.loginForm.get('email')?.setValue(localStorage.getItem('email'));
    this.loginForm.get('password')?.setValue(localStorage.getItem('password'));
  }


  handleCheck(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.saveCredentials();
  }

  saveCredentials(): void {
    localStorage.setItem('email', this.loginForm.get('email')?.value || '');
    localStorage.setItem('password', this.loginForm.get('password')?.value || '');
  }

  
  submit(){
    if(!this.loginForm.valid){
      return;
    }

    const {email, password}= this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error:'There was an error'
        })
      ).subscribe(() =>{
        this.router.navigate(['/home']);
       
      });
    }
  }
    
}
    

