import { Component, OnInit } from '@angular/core';
import { FacultyFunService } from '../faculty/faculty-fun.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: FacultyFunService) { }

  events: any;

  ngOnInit() {
    this.service.geAllEvents().subscribe(ev =>{
      if(ev != null || ev != undefined){
      this.events = ev;
      }
    });
  }

}
