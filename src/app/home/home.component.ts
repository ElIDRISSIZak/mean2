import { Component, ViewChild, ElementRef} from '@angular/core';

import { User } from '../model/user';
import { Router } from '@angular/router';
// Import the DataService
//import { TaskService } from './task.service';

@Component({
  selector: 'welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
      currentUser: User;
@ViewChild('myCanvas') myCanvas: ElementRef;
public context: CanvasRenderingContext2D;

  // Define a users property to hold our user data
  tasks: Array<any>;
  desc: string;
  task: any;

  // Create an instance of the DataService through dependency injection
  constructor( private router: Router) {
	if (localStorage.getItem('currentUser')) {
           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   	 	console.log("pfffffffffffffff");
        }
	
	
  }

ngAfterViewInit(): void {
  this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
}
  
  
}
