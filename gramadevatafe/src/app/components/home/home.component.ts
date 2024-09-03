
import { HomeserviceService } from '../../services/homeservice/homeservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';
import { CommonService } from '../../services/commonservice/common.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ConnectyourorginComponent } from '../connectyourorgin/connectyourorgin.component';
import { MatDialog } from '@angular/material/dialog';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { UserService } from '../../services/userservice/user.service';
import { ConnectionsService } from '../../services/connectionservice/connections.service';
import { OnlymemberComponent } from '../member/onlymember/onlymember.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports:[
    CommonModule,
    NzModalModule,
    NgxSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent{
  homeData: any;
  templeCategories:any;
  goshalaCategories:any;
  eventCategories:any;
  villages:any;
  orgdata:any;
  categorydata:any;
  userId: any;
  userdata: any;
  membertype: any;
  connectiondata: any;


  constructor(private router: Router, 
    private homeservice: HomeserviceService,
     private dialog:MatDialog,
      private templeservice:TempleserviceService,
      private spinner: NgxSpinnerService,
      private authenticationService:AuthenticationService,
      private userservice:UserService,
      private connectionservice:ConnectionsService
    ) { }





  ngOnInit(): void {
   
 
    this.FetchHomeData();
  }

//   FetchHomeData(): void {
//     this.spinner.show();
//     this.homeservice.getHomeData()
//     .subscribe(data => {
//       this.villages = data.villages;
//       console.log(this.villages,"1111111111111111")
//       this.templeCategories = data.templeCategories;
//       console.log(this.templeCategories,"templeCategories")
//       this.goshalaCategories = data.goshalaCategories;
//       this.eventCategories = data.eventCategories;
//       this.spinner.hide();
//       if(this.authenticationService.isLoggedIn===true){
//         this.userId = localStorage.getItem("user")
//         this.userservice.profiledata(this.userId).subscribe(
//           (profileData) => {
//             this.userdata = profileData.some((item: any) => item.is_member === 'true');
//             this.membertype = profileData.some((item: any) => item.type === 'PUJARI');
//             console.log(this.userdata, "7777777777tt");
//             if (this.userdata ===true) {
//               console.log("kjhgfd");
//               this.userservice.isMemberIn = true;
//             }
//             if (this.membertype==='PUJARI') {
//               console.log("Ispujari");
//               this.userservice.isPujariIn = true;
//             }
//           },
//         )

//       }
      
//     });
// }

FetchHomeData(): void {
  this.spinner.show();
  this.homeservice.getHomeData().subscribe({
    next: (data) => {
      this.villages = data.villages;
      this.templeCategories = data.templeCategories;
      this.goshalaCategories = data.goshalaCategories;
      this.eventCategories = data.eventCategories;
      
      console.log(this.villages, "Villages Data");
      console.log(this.templeCategories, "Temple Categories Data");

      this.spinner.hide();

      if (this.authenticationService.isLoggedIn) {
        this.userId = localStorage.getItem("user");

        if (this.userId) {
          this.connectionservice.GetConnnections(this.userId).subscribe({
            next: (data) => {
              this.connectiondata = data.temple.slice(0, 4);
              console.log(this.connectiondata, "Connection Data");
            },
            error: (error) => {
              console.error("Error fetching connection data", error);
            }
          });

          this.userservice.profiledata(this.userId).subscribe({
            next: (profileData) => {
              this.userdata = profileData.is_member;
              this.membertype = profileData.type;

              console.log(this.userdata, "Is Member");
              console.log(this.membertype, "Member Type");

              if (this.userdata) {
                console.log("User is a member");
                this.userservice.isMemberIn = true;
                localStorage.setItem('isMemberIn', 'true');
              }

              if (this.membertype) {
                console.log("User is a Pujari");
                this.userservice.isPujariIn = true;
                localStorage.setItem('isPujariIn', 'true');
              }
            },
            error: (error) => {
              console.error("Error fetching profile data", error);
            }
          });
        }
      }
    },
    error: (error) => {
      console.error("Error fetching home data", error);
      this.spinner.hide();
    }
  });
}


handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/ohm.jpg';
}


navigateToCategoryDetail(templeCategory: any): void {
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  
  this.router.navigate(["globaltemples", templeCategory._id], { state: { templeCategory } })
    .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}




navigateTo(route: string): void {
  const ismemberin = this.userservice.isMemberIn;
  if (ismemberin === false) {
    this.openmemberDialog();
  } else {
    this.router.navigate([route]);
  }
}






openmemberDialog(): void {
  console.log('sssssssssss');
  const dialogRef = this.dialog.open(OnlymemberComponent, {
    data: { displayName: 'signup' },
    autoFocus: false,
    backdropClass: 'dialog-backdrop',
  });

  dialogRef.afterClosed().subscribe(() => {
    // Handle after dialog close actions here
  });
}

navigateToTempleFilters():void{
  this.templeservice.gettemplecategorybyname("Ayyappa Swamy").subscribe(
    data=>{
      this.categorydata =data._Id
      this.router.navigate(["globaltemples",''])

    }
  )
}


navigateToGoshalaCategoryDetail():void{
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(["goshala",''])
  .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}




navigateToEventsCategoryDetail():void{

  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(["events",""])
  .then(()=> console.log("navigation succesfull"))
  .catch(eroror =>console.error("navigation failed"));
}

navigateToVillageDetail(_id:any):void{
  this .router.navigate(['villages',_id])
}



openVillageDialog(): void {
  this.spinner.show();
  const dialogRef = this.dialog.open(ConnectyourorginComponent, {
    data: { displayName: 'connectorgin' }, 
    autoFocus: false, 
    backdropClass: 'dialog-backdrop',
  });
  this.spinner.hide();
  
  dialogRef.afterClosed().subscribe(() => {
    
  });
}

navigateTempleDetail(_id:string):void{
  this.router.navigate(["getbytemples",_id])
}


// fetchorh():void{
//   this.homeservice.getorg().subscribe(
//     data => {
//       this.orgdata = data.results
//     }
//   )
// }

}

