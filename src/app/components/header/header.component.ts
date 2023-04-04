import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AthenticationService } from 'src/app/authentication/athentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uuid: string;
  username: string;


  constructor(public afAuth: AngularFireAuth, private authService: AthenticationService) { }
  
  ngOnInit(): void {

    // it has to be called in order to be visible
    this.getUserId();
    this.getUserName();
  }


  logout(): void {
    this.afAuth.signOut();
}

async getUserId(){
  this.uuid = await this.authService.getCurrentUserId();
}

async getUserName(){
  this.username = await this.authService.getCurrentUsername();
}


}
