import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { take, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AthenticationService {

  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
      this.userLoggedIn = false;

      this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
          if (user) {
              this.userLoggedIn = true;
          } else {
              this.userLoggedIn = false;
          }
      });
  }

  loginUser(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email, password)
          .then(() => {
              console.log('Auth Service: loginUser: success');
              this.router.navigate(['/dashboard']);
          })
          .catch(error => {
              console.log('Auth Service: login error...');
              console.log('error code', error.code);
              console.log('error', error);
              // if (error.code)
              //     return { isValid: false, message: error.message };
          });
  }

  signupUser(user: any, username: string): Promise<any> {
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
          .then((result) => {
              // let emailLower = user.email.toLowerCase();
              result.user.sendEmailVerification();                    // immediately send the user a verification email
              result.user.updateProfile({
                displayName: username
              })
          })
          .catch(error => {
              console.log('Auth Service: signup error', error);
              // if (error.code)
              //     return { isValid: false, message: error.message };
          });
  }

  async getCurrentUserId(): Promise<string> {
    const user = await this.afAuth.authState.pipe(take(1)).toPromise();
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }

  // WE replaced the deprecated method with the latest rxjs patch, using firstValueFrom
  async getCurrentUsername(): Promise<string> {
    const user = await firstValueFrom(this.afAuth.authState.pipe(take(1)));
    if (user) {
      return user.displayName;
    } else {
      return null;
    }

}
}