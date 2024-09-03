import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';


@Component({
  selector: 'app-templemain',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './templemain.component.html',
  styleUrl: './templemain.component.css'
})
export class TemplemainComponent {
  templeCategory:any;
  indiantemple:any;
  globaltemple:any;
  categorydata:any;


  constructor(private router: Router,
     private templeservice: TempleserviceService,
     private locationservice:LocationService,
     private spinner: NgxSpinnerService,
     private authenticationService:AuthenticationService
    ) { }

  ngOnInit():void{
   this.fetchTempleMain();

  }

  fetchTempleMain(): void {
    this.spinner.show()
    this.templeservice.getTempleMain().subscribe({
      next: (data) => {
        this.templeCategory = data.categories;
        console.log(this.templeCategory,"2222222222222222")
        this.indiantemple = data.indianTemples;
        this.globaltemple = data.globalTemples;
        this.spinner.hide()
      },
      
    });
  }

  // navigateToTempleFilters():void{
  //   this.templeservice.gettemplecategorybyname("Ayyappa Swamy").subscribe(
  //     data=>{
  //       this.categorydata =data._id
  //       console.log(this.categorydata,"1111111111111")
  //       this.router.navigate(["categorytemples",this.categorydata._id])
  
  //     }
  //   )
  // }

  navigateToTempleFilters(viewType: any): void {
    let userId = this.authenticationService.getCurrentUser();
    if (!userId) {
      this.authenticationService.showLoginModal();
      return;
    }
  
    this.templeservice.gettemplecategorybyname("Asta Vinayaka").subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoryId = data[0]._id;
          console.log(categoryId, "Category ID");
  
          let navigationPath: any[] = [];
          if (viewType === 'indian') {
            navigationPath = ['categorytemples', categoryId];
          } else if (viewType === 'global') {
            navigationPath = ['globaltemples', categoryId];
          } else {
            console.error("Invalid viewType:", viewType);
            return;
          }
  
          this.router.navigate(navigationPath);
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
          this.router.navigate(["globaltemples", categoryId]);
        } else {
          console.error('No category data found');
        }
      },
      error => {
        console.error('Error fetching category data', error);
      }
    );
  }
  

  navigateToCategoryDetail(templeCategory: any): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  
    this.router.navigate(["categorytemples", templeCategory._id])
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }
  navigateTotempleDetail(_id:string): void{
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(['getbytemples',_id])
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
 
}
