import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  constructor(
    private apiService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiService.getPosts().subscribe(
      (data: any) => {
        this.posts = data;
        console.log(this.posts);
      }
    );
  }

}
