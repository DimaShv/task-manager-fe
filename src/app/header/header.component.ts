import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {UserDto} from '../user/user.dto';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: UserDto;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  logout(): void {
    this.authService.logout();
  }
}
