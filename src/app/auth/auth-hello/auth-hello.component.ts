import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-hello',
  templateUrl: './auth-hello.component.html',
  styleUrls: ['./auth-hello.component.css']
})
export class AuthHelloComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  run() {
    if (this.authService.isAuthenticated()) {
      console.log('hello');
      this.router.navigate(['/hello']);
    } else {
      console.log('login');
      this.router.navigate(['/login']);
    }
  }
}
