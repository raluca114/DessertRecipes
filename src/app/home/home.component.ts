import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent  implements OnInit {

  firestore = new FirebaseTSFirestore();
  user$ = this.authService.currentUser$;
  currentUserId: string | null = null;

  constructor(public authService:AuthenticationService, private router:Router){

  }
  ngOnInit():void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      } 
    });
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['login']);
    })
  }
}