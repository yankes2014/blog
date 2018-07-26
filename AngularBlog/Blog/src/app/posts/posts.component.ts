import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
@Injectable()
export class PostsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, ) { }

  userClaims: any;
  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}

