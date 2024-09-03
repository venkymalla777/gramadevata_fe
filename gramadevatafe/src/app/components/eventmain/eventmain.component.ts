import { Component } from '@angular/core';
import { EventService } from '../../services/eventservice/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location/location.service';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';

@Component({
  selector: 'app-eventmain',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './eventmain.component.html',
  styleUrl: './eventmain.component.css'
})
export class EventmainComponent {

  eventmaindata:any;
  Eventcategories:any;
  indianevents:any;
  globalevents:any;


  constructor(private eventservice:EventService,
     private router:Router,
      private locationservice:LocationService,
      private spinner: NgxSpinnerService,
      private authenticationService:AuthenticationService
    ){}

  ngOnInit():void{
    this.spinner.show()
    this.eventservice.getEventMain().subscribe(
      data=>{
        this.eventmaindata = data
        this.Eventcategories = this.eventmaindata.categories
        this.indianevents= this.eventmaindata.indianevents
        this.globalevents= this.eventmaindata.globalevents
        this.spinner.hide()
      }
    )
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }


  navigateToeventCategoryDetail(eventcategorydata: any): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(["events", eventcategorydata._id], { state: { eventcategorydata } })
      .then(() => console.log("navigation success"))
      .catch(error => console.error("navigation failed", error));
  }

  navigateEventdata(event:string):void{
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(['detailviewevent',event])
  }

  navigateToGoshalaCategoryFilters(): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.eventservice.getNameByEventCategory("Bhoomi Pooja").subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoryId = data[0]._id;
          console.log(categoryId, "1111111111111");
          this.router.navigate(["events", categoryId]);
        } else {
          console.error('No category data found');
        }
      },
      error => {
        console.error('Error fetching category data', error);
      }
    );
  }

  navigateToGlobaltemples(): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.locationservice.getNameByCountry("Afghanistan").subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoryId = data[0]._id;
          console.log(categoryId, "1111111111111");
          this.router.navigate(["globalevents", categoryId]);
        } else {
          console.error('No category data found');
        }
      },
      error => {
        console.error('Error fetching category data', error);
      }
    );
  }

}
