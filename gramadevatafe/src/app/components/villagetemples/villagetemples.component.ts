import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillageService } from '../../services/villageservice/village.service';
import { Router,ActivatedRoute } from '@angular/router';
import { state } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetmemberComponent } from '../member/getmember/getmember.component';
import { AddmemberComponent } from '../member/addmember/addmember.component';
import { PujariComponent } from '../pujari/pujari.component';
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { UserService } from '../../services/userservice/user.service';
import { SharedService } from '../../services/sharedservice/shared.service';
import { MemberService } from '../../services/memberservice/member.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { OnlymemberComponent } from '../member/onlymember/onlymember.component';

import { Subscription } from 'rxjs';
import { NotificationHelper } from '../commons/notification';



@Component({
  selector: 'app-villagetemples',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './villagetemples.component.html',
  styleUrl: './villagetemples.component.css'
})
export class VillagetemplesComponent {

  private subscription: Subscription = new Subscription();
  ConnectForm!: FormGroup;
  villagedata:any;
  gramadevatatemples:any;
  othertemples:any;
  goshalas:any;
  events:any;
  connection:any;
  village_id:any;
  villageid:any;
  isConnected=false;
  currentUser: any;
  userdata:any;
  membertype:any;
  
  pujariConnections: any[] = [];
  memberConnections: any[] = [];
  


  constructor(private route:ActivatedRoute,
     private router:Router,
     private fb: FormBuilder,
      private villageservice:VillageService,
       private dialog:MatDialog,
       private authenticationService:AuthenticationService,
       protected userservice:UserService,
       protected sharedService: SharedService,
       private memberservice:MemberService,
       private spinner: NgxSpinnerService,
       private notificationHelper:NotificationHelper
      ){ }


  // ngOnInit():void{
  //   this.fetchvillages();
  //   let currentUser = this.authenticationService.getCurrentUser()
    
  // }


  ngOnInit() {

    this.subscription.add(
      this.sharedService.triggerFetchVillageData$.subscribe(() => {
        this.fetchvillages();
      })
    );
    // this.village_id = this.route.snapshot.paramMap.get("_id");
    // this.fetchvillages(this.village_id);
    this.route.paramMap.subscribe(params => {
      this.village_id = params.get("_id");
      if (this.village_id) {
        this.fetchvillages();
      }
    });
    this.connectionsForm();
    
  }
  
  connectionsForm(): void {
    this.ConnectForm = this.fb.group(
      {
      connected_as:"PUJARI",
      village: this.route.snapshot.paramMap.get("_id"),
      user : localStorage.getItem('user')
      }
    );
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }


  fetchvillages(): void {
    this.spinner.show()
    this.isConnected = false;
    // this.village_id = this.route.snapshot.paramMap.get("_id");
    this.villageservice.getbyvillage(this.village_id).subscribe(
      (data) => {
        this.villagedata = data;
        console.log(this.villagedata, "3265");
        this.gramadevatatemples = this.villagedata.gramdeavatatemples;
        console.log(this.gramadevatatemples, "gramadevatatemples");
        this.othertemples = this.villagedata.othertemples;
        console.log(this.othertemples, "othertemples");
        this.goshalas = this.villagedata.goshalas;
        this.events = this.villagedata.events;
        this.connection = this.villagedata.Connections;
        this.currentUser = this.authenticationService.getCurrentUser();
        console.log(this.villagedata, "11111111111");
        this.pujariConnections = this.connection.filter((conn:any) => conn.connected_as === 'PUJARI');
        this.memberConnections = this.connection.filter((conn:any) => conn.connected_as === 'MEMBER');
        console.log('Pujari Connections:', this.pujariConnections);
        console.log('Member Connections:', this.memberConnections);
        this.spinner.hide()
  
        this.userservice.profiledata(this.currentUser).subscribe(
          (profileData) => {
            this.userdata = profileData.some((item: any) => item.is_member === 'true');
            this.membertype = profileData.some((item: any) => item.type === 'PUJARI');
            console.log(this.userdata, "7777777777tt");
            if (this.userdata) {
              console.log("kjhgfd");
              this.userservice.isMemberIn = true;
            }
            if (this.membertype) {
              console.log("Ispujari");
              this.userservice.isPujariIn = true;
            }
          },
          (error) => {
            console.error("Error fetching profile data", error);
          }
        );
  
        if (this.villagedata) {
          if (Array.isArray(this.villagedata.Connections)) {
            const connection = this.villagedata.Connections.find(
              (conn: any) => conn.user && conn.user._id === this.currentUser
            );
            if (connection) {
              this.isConnected = true;
              console.log("ASDFGBNHJMK");
            }
          } else {
            console.error("Connections is not defined or is not an array");
          }
        } else {
          console.error("Villagedata is not defined");
        }
      },
      (error) => {
        console.error("Error fetching village data", error);
      }
    );
    console.log(this.village_id, "[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]");
  }
  

  isconnect(): void {
    const connectdata = this.ConnectForm.value;
    this.memberservice.connect(connectdata).subscribe(
      response => {
        console.log(response);
        this.fetchvillages(); // Call fetchvillages() after a successful response
      },
      error => {
        console.error('Error:', error); // Handle any errors if necessary
      }
    );
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


  OpenMemberDialog(member: any): void {

    const dialogRef = this.dialog.open(GetmemberComponent, {

        data: { displayName: 'getmember', member },
        autoFocus: false,
        backdropClass: 'dialog-backdrop'
    });

    dialogRef.afterClosed().subscribe(() => {
        // Optional: Add logic to handle actions after dialog is closed
    });
}




OpenAddmemberDilog(): void {
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.villageid = this.route.snapshot.paramMap.get("_id")
  console.log(this.villageid,"55454")
  const dialogRef = this.dialog.open(AddmemberComponent, {
    data: { displayName: 'addmember', villageid: this.villageid },
    autoFocus: false,
    backdropClass: 'dialog-backdrop'
  });
}

OpenPujariDilog(): void {
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.villageid = this.route.snapshot.paramMap.get("_id")
  console.log(this.villageid,"55454")
  const dialogRef = this.dialog.open(PujariComponent, {
    data: { displayName: 'addpujari', villageid: this.villageid },
    autoFocus: false,
    backdropClass: 'dialog-backdrop'
  });
}

navigateTotempleDetail(_id:string): void{
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(['getbytemples',_id])
}

navigategoshaladata(goshala:string):void{
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(['detailviewgoshala'],{state:{goshala}})
}

navigateEventdata(event:string):void{
  
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(['detailviewevent',event])
}

// NavigateToChatRoom():void{
//   let userId = this.authenticationService.getCurrentUser();
//     if (userId == undefined || userId == null) {
//       this.authenticationService.showLoginModal()
//       return;
//     }

//     const ismemberin = this.userservice.isMemberIn;
//     if (ismemberin === false) {
//       this.openmemberDialog();
//     } else {
//       this.village_id = this.route.snapshot.paramMap.get("_id");
//       console.log(this.village_id,"village id")
//       this.router.navigate(['chatroom',this.village_id])
//     }
    
//   this.village_id = this.route.snapshot.paramMap.get("_id");
//   console.log(this.village_id,"village id")
//   this.router.navigate(['chatroom',this.village_id])
// }
NavigateToChatRoom(): void {
  const userId = this.authenticationService.getCurrentUser();

  // Check if user is logged in
  if (!userId) {
    this.authenticationService.showLoginModal();
    return;
  }

  const isMemberIn = this.userservice.isMemberIn;

  // Check if user is a member
  if (!isMemberIn) {
    // this.openmemberDialog();
    this.notificationHelper.showSuccessNotification('please Conects as member in this village than Chat with vilage Members', '');
    return;
  }

  // Check if the user is connected
  if (!this.isConnected) {
    // this.openmemberDialog();
    this.notificationHelper.showSuccessNotification('please Conects as member in this village than Chat with vilage Members', '');
    return;
  }

  // Get village ID from the route parameters
  this.village_id = this.route.snapshot.paramMap.get("_id");

  // Handle case if village_id is not found
  if (!this.village_id) {
    console.error("Village ID not found in route parameters");
    return;
  }

  console.log(this.village_id, "village id");

  // Navigate to chatroom with village ID
  this.router.navigate(['chatroom', this.village_id]);
}




}
