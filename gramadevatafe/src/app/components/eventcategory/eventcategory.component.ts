// import { Component } from '@angular/core';
// import { EventService } from '../../services/eventservice/event.service';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-eventcategory',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './eventcategory.component.html',
//   styleUrl: './eventcategory.component.css'
// })
// export class EventcategoryComponent {
//   eventcategorydata:any;
//   picdata:any;
  
//   constructor(private router:Router ,private eventservice:EventService ){ }

//   ngOnInit():void{

//     this.fetchEventcategory();

//   }

//   fetchEventcategory():void{
//     this.eventservice.getEventCategory()
//     .subscribe(data=>{
//       this.eventcategorydata = data
//       this.picdata = this.eventcategorydata.pic;

//     })
//   }

//   // navigateToeventCategoryDetail(_id:string):void{
//   //   console.log("clicked",_id)
//   //   this.router.navigate(["events",_id])
//   //   .then(() =>console.log("navigation succes"))
//   //   .catch(errors =>console.error("navigation failed"))
//   // }

//   navigateToeventCategoryDetail(eventcategorydata: any): void {
//     this.router.navigate(["events", eventcategorydata._id], { state: { eventcategorydata } })
//       .then(() => console.log("navigation success"))
//       .catch(error => console.error("navigation failed", error));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/eventservice/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventcategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventcategory.component.html',
  styleUrls: ['./eventcategory.component.css']
})
export class EventcategoryComponent implements OnInit {
  eventcategorydata: any;
  picdata: any;

  constructor(private router: Router, private eventservice: EventService) { }

  ngOnInit(): void {
    this.fetchEventcategory();
  }

  fetchEventcategory(): void {
    this.eventservice.getEventCategory()
      .subscribe(data => {
        this.eventcategorydata = data;
        this.picdata = this.eventcategorydata.pic;
      });
  }

  navigateToeventCategoryDetail(eventcategorydata: any): void {
    this.router.navigate(["events", eventcategorydata._id], { state: { eventcategorydata } })
      .then(() => console.log("navigation success"))
      .catch(error => console.error("navigation failed", error));
  }
}
