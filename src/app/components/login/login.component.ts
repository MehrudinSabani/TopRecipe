import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from 'src/app/authentication/athentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AthenticationService, private router: Router, private afAuth: AngularFireAuth) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
       
  }

  loginUser() {
      if (this.loginForm.invalid)
          return;

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
          if (result == null) {                               // null is success, false means there was an error
              console.log('logging in...');
              this.router.navigate(['/dashboard']);                // when the user is logged in, navigate them to dashboard
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
          }
      });
  }
}