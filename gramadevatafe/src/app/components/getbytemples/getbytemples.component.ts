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
import { AddSpaceComponent } from '../add-space/add-space.component';
import { AddSpace1Component } from '../add-space1/add-space1.component';





@Component({
  selector: 'app-getbytemples',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    AddSpaceComponent,
    AddSpace1Component
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
  isMemberIn = false
  isPujariIn = false
  connectedId: any;
  selectedImage: any;
  temple: any;

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
        this.isPujariUser();
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
   this.isMemberUser();
   this.isPujariUser();


    this.commentform = this.fb.group({
      body:['',Validators.required],
      temple:this.route.snapshot.paramMap.get("id"),
      // temple:null,
      user:localStorage.getItem('user')

    })
    
   
  }


  isMemberUser() {
    const isMemberIn = localStorage.getItem("is_member") === "true";
    console.log(isMemberIn,"isMemberIn")
  if (isMemberIn) {
    this.isMemberIn = true
  } else {
    this.isMemberIn = false
  } 
}

isPujariUser() {
  const isPujariIn = localStorage.getItem("type") === "PUJARI";
  console.log(isPujariIn,"isPujariIn")
if (isPujariIn) {
  this.isPujariIn = true
} else {
  this.isPujariIn = false
} 
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


  onImageClick(image: string): void {
    this.selectedImage = image; // Update the main image
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

        console.log(this.templedata[0].image_location[0],'this.templedata.image_location')

        if (this.templedata[0].image_location[0] && this.templedata[0].image_location[0].length > 0) {
          this.selectedImage = this.templedata[0].image_location[0]; // Default to the first image
        } else {
          this.selectedImage = 'assets/ohm.jpg'; // Fallback image if no images exist
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
            console.log("User is connected.",connection._id);
            this.connectedId = connection._id
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
    const ismemberin = localStorage.getItem("is_member") === "true";
    const commentdata  = this.commentform.value;
 if(ismemberin){
  
 

    
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
  }else {
    this.openmemberDialog();
  }
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
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }
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
      data: { displayName: 'addpujari', templeId: this.templeId },
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
      user: localStorage.getItem('user'),
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
      user : localStorage.getItem('user'),
      connected_as:'PUJARI'

    }
    this.memberservice.connect(contactedPujari).subscribe(
      response => {
        console.log(response);
        this.ConnectForm.reset()
        this.fecthtempledata()
      })
  }

  disconnect(){
    this.memberservice.DisconnectMember(this.connectedId).subscribe(
      data =>{
        console.log('deleted succesfully')
        this.fecthtempledata()
      }
    )
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





  sharegetbytemple(temple: any) {
    const shareUrl = temple && temple._id 
      ? `${window.location.origin}/getbytemples/${temple._id}`
      : `${window.location.origin}/getbytemples/`; 
  
    console.log('Share URL:', shareUrl);
  
    if (navigator.share) {
      navigator.share({
        title: temple ? temple.name : 'Temple',
        text: temple && temple.desc ? temple.desc : 'Check out this temple!',
        url: shareUrl
      }).then(() => {
        console.log('Sharing successful');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      alert(`Share URL: ${shareUrl}`);
    }
  }
  







}
