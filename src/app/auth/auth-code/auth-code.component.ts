import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.css']
})
export class AuthCodeComponent implements OnInit {

  constructor(private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const code = this.router.snapshot.parent.queryParams.code;
    this.authService.exchangeCodeForAuthAndRedirect(code);
  }

  logout(): void {
    this.authService.logout();
  }
}
