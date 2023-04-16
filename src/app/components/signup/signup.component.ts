import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from 'src/app/authentication/athentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AthenticationService, private router: Router, private afAuth: AngularFireAuth) {
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
  }

  signup() {
      if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
          return;

        //   todo: Why not merge displayName with formData?
      const displayName = this.signupForm.get('displayName').value;
      const formData = { email: this.signupForm.get('email').value, password: this.signupForm.get('password').value };

      this.authService.signupUser(formData, displayName).then((result) => {
          if (result == null)                                 // null is success, false means there was an error
              this.router.navigate(['/dashboard']);
          else if (result.isValid == false)
              this.firebaseErrorMessage = result.message;
      }).catch(() => {

      });
  }

}
