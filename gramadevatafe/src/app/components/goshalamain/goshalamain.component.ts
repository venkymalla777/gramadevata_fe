import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location/location.service';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';

@Component({
  selector: 'app-goshalamain',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './goshalamain.component.html',
  styleUrl: './goshalamain.component.css'
})
export class GoshalamainComponent {

  goshalamaindata:any;
  categoriesdata:any;
  indiangoshalasdata:any;
  globalgoshalasdata:any;
  constructor(private goshalaservice:GoshalaService,
     private router:Router,
      private locationservice:LocationService,
      private spinner: NgxSpinnerService,
      private authenticationService:AuthenticationService
    ){ }

  ngOnInit():void{
    this.fetchgoshalamain();
  }

  fetchgoshalamain():void{
    this.spinner.show()
    this.goshalaservice.getgoshalamain().subscribe(
      data => {
        this.goshalamaindata = data
        this.categoriesdata = this.goshalamaindata.categories
        this.indiangoshalasdata= this.goshalamaindata.indiangoshalas
        console.log(this.indiangoshalasdata,"252515")
        this.globalgoshalasdata = this.goshalamaindata.globalgoshalas
        this.spinner.hide()
      }
    )
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  navigateToGoshalaCategoryDetail(goshalaCategory:any):void{
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(["goshala",goshalaCategory._id],{state:{ goshalaCategory }})
    .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

  navigategoshaladata(goshala:string):void{
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(['detailviewgoshala'],{state:{goshala}})
  }


  navigateTotempleDetail(_id: string): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    console.log("Clicked", _id);
    console.log("Navigating to temples with ID:", _id);
    this.router.navigate(['getbygoshala', _id])
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

  navigateToGoshalaCategoryFilters(): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.goshalaservice.getbynameGoshalaCategories("Government Goshalas").subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoryId = data[0]._id;
          console.log(categoryId, "1111111111111");
          this.router.navigate(["goshala", categoryId]);
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
          this.router.navigate(["globalgoshalas", categoryId]);
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
