import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { CommonService } from '../../services/commonservice/common.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { UserService } from '../../services/userservice/user.service';
import { OnlymemberComponent } from '../member/onlymember/onlymember.component';
import { MatDialog } from '@angular/material/dialog';
import { AddmemberComponent } from '../member/addmember/addmember.component';
import { MemberService } from '../../services/memberservice/member.service';
import { PujariComponent } from '../pujari/pujari.component';
import { SharedService } from '../../services/sharedservice/shared.service';
import { Subscription } from 'rxjs';






@Component({
  selector: 'app-getbytemples',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule
  ],
  templateUrl: './getbytemples.component.html',
  styleUrl: './getbytemples.component.css'
})
export class GetbytemplesComponent {
  private subscription: Subscription = new Subscription();
  commentform!:FormGroup;
  templeId:any;
  templedata:any;
  commentdata1:any;
  commentText: string = '';
  blockId: any;
  nearbytemples: any;
  // templeId: any;
  ConnectForm!:FormGroup;
  ConnectionData: any;
  isConnected= false;

  constructor(private route:ActivatedRoute,
    private router:Router ,
    private templeservice:TempleserviceService ,
    private fb:FormBuilder,
     private commonservice:CommonService,
     private authenticationService: AuthenticationService,
     protected userservice:UserService,
     private dialog: MatDialog,
     private memberservice:MemberService,
     private sharedService: SharedService
     
    ){ }

  ngOnInit(): void {
    this.subscription.add(
      this.sharedService.triggerFetchByTempleData$.subscribe(() => {
        this.templeId = this.route.snapshot.paramMap.get('id');
        this.fecthtempledata();
      })
    );
    this.fecthtempledata();

    this.route.paramMap.subscribe(params => {
      this.templeId = params.get("id");
      console.log("templeId1",this.templeId)
      if (this.templeId) {
        this.fecthtempledata();
      }
    });
    console.log("templeId",this.templeId)
  //  this.fecthtempledata();
   this.connectionsForm();


    this.commentform = this.fb.group({
      body:['',Validators.required],
      temple:this.route.snapshot.paramMap.get("id"),
      // temple:null,
      user:localStorage.getItem('user')

    }) 
  }

  connectionsForm(): void {
    this.ConnectForm = this.fb.group(
      {
      // connected_as:"PUJARI",
      temple: this.route.snapshot.paramMap.get("_id"),
      user : localStorage.getItem('user')
      }
    );
  }

  loadtempledata() {
    
    this.templedata = []; // Clear previous data
    this.fecthtempledata();
    this.nearbytemples=[];
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }




  fecthtempledata(): void {
    this.isConnected = false;
    let userId = this.authenticationService.getCurrentUser();
    
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal();
      return;
    }
  
    if (!this.templeId) {
      console.error("Temple ID is not defined.");
      return;
    }
  
    this.templeservice.getbytemple(this.templeId).subscribe(
      (data: any) => {
        console.log("API Response Data:", data); // Log the data received from the API
  
        if (!data || data.length === 0) {
          console.error("templedata is not defined or empty");
          return;
        }
  
        this.templedata = data;
        this.blockId = this.templedata[0]?.object_id?.block?.block_id;
        this.ConnectionData = this.templedata[0]?.Connections;
  
        console.log("Connection Data:", this.ConnectionData);
        console.log("Block ID:", this.blockId);
  
        // Check for blockId before making filtertemples call
        if (!this.blockId) {
          console.error("Block ID is not defined.");
          return;
        }
  
        this.templeservice.filtertemples('', this.blockId).subscribe(
          (filterData: any) => {
            const filteredResults = filterData.results.filter(
              (temple: any) => temple._id !== this.templeId
            );
            this.nearbytemples = filteredResults;
            console.log("Nearby Temples:", this.nearbytemples);
          },
          (filterError: any) => {
            console.error("Error fetching nearby temples", filterError);
          }
        );
  
        // Check if ConnectionData is defined and is an array
        if (Array.isArray(this.ConnectionData)) {
          const connection = this.ConnectionData.find(
            (conn: any) => conn.user && conn.user._id === userId
          );
          if (connection) {
            this.isConnected = true;
            console.log("User is connected.");
          }
        } else {
          console.error("Connections is not defined or is not an array");
        }
      },
      (apiError: any) => {
        console.error("Error fetching temple data", apiError);
      }
    );
  }
  
  
  
  




  onSubmit() {
    const ismemberin = this.userservice.isMemberIn
    const commentdata  = this.commentform.value;
 if(ismemberin ===false){
  this.openmemberDialog();
 }

    
  const comment = {
    body: commentdata.body,
    temple: this.route.snapshot.paramMap.get("id"),
    user:localStorage.getItem('user')
};

  

    this.commonservice.addcomment(comment).subscribe(
      response => {
        
        this.fecthtempledata();
        this.commentform.reset();
        console.log(response,"11111111111111")
        
        // Clear the comment text box or any other UI updates
        // this.commentText = '';
      },
      error => {
        console.error('Error posting comment:', error);
        // Handle error as needed
      }
    );
  }

 
  // openMap(url: string): void {
  //   window.open(url);

  // }

  


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


  OpenAddmemberDilog(templeid:any): void {
    // let userId = this.authenticationService.getCurrentUser();
    //   if (userId == undefined || userId == null) {
    //     this.authenticationService.showLoginModal()
    //     return;
    //   }
    this.templeId = this.route.snapshot.paramMap.get("_id")
    console.log(this.templeId,"55454")
    const dialogRef = this.dialog.open(OnlymemberComponent, {
      data: { displayName: 'addmember', templeId: templeid },
      autoFocus: false,
      backdropClass: 'dialog-backdrop'
    });
  }

  OpenPujariDilog(templeid:any): void {
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }
    this.templeId = templeid
    console.log(this.templeId,"55454")
    const dialogRef = this.dialog.open(PujariComponent, {
      data: { displayName: 'addpujari', villageid: this.templeId },
      autoFocus: false,
      backdropClass: 'dialog-backdrop'
    });
  }


  openMap(mapLocation: string) {
    if (mapLocation) {
      window.open(mapLocation, '_blank');
    } else {
      console.error('Map location URL is invalid');
    }
  }


  isMemberconnect(templeid:any): void {
    const connectdata = this.ConnectForm.value;
    const contactedmember = {
      temple: templeid,
      user: connectdata.user,
      connected_as: 'MEMBER'
    };
  
    this.memberservice.connect(contactedmember).subscribe(
      response => {
        console.log(response);
        this.ConnectForm.reset()
        this.fecthtempledata()
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  

  isPujariconnect(templeid:any):void{
    const connectdata = this.ConnectForm.value;
    const contactedPujari = {
      temple : templeid,
      user : connectdata.user,
      connected_as:'PUJARI'

    }
    this.memberservice.connect(contactedPujari).subscribe(
      response => {
        console.log(response);
        this.ConnectForm.reset()
        this.fecthtempledata()
      })
  }

  navigatetemple(templeId:any):void{
    
    this.router.navigate(['getbytemples', templeId]);
  }

  NavigateToChatRoom(templeId:any):void{
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }
    
    this.router.navigate(['templechat',templeId])
  }

}