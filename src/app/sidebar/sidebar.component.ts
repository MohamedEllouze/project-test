import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isShown: boolean = true; // hidden by default

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isShown = !this.isShown;
  }

}
