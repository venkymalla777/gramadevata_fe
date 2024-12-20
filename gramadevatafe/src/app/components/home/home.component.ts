
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AddSpaceComponent } from '../add-space/add-space.component';
import { AddSpace1Component } from '../add-space1/add-space1.component';
import { AddspacerightComponent } from '../addspaceright/addspaceright.component';

interface Ad {
  videoUrl: SafeResourceUrl;
  isVideo?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[
    CommonModule,
    NzModalModule,
    NgxSpinnerModule,AddSpaceComponent,AddSpace1Component,AddspacerightComponent
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
  adspace: Ad[] = [];
  aadspace: Ad[] = [];
  adVideo:any;
  renderer:any;

  ads:Ad[]=[];
  currentIndex:number=0;
  isPlaying = false;

  constructor(private router: Router, 
    private homeservice: HomeserviceService,
     private dialog:MatDialog,
      private templeservice:TempleserviceService,
      private spinner: NgxSpinnerService,
      private authenticationService:AuthenticationService,
      private userservice:UserService,
      private connectionservice:ConnectionsService,
      private sanitizer: DomSanitizer
      


    ) { 
      this.ads = [
        { videoUrl: this.sanitizeUrl('../../../assets/gramadevata_final_video.mp4'), isVideo: true },
      ];
      this.adspace = [
        { videoUrl: this.sanitizeUrl('../../../assets/temple.mp4'), isVideo: true },  
      ];
      this.aadspace = [
        { videoUrl: this.sanitizeUrl('../../../assets/save plastic video.mp4'), isVideo: true },  
      ];
    }
    onVideoLoaded(): void {
      if (this.adVideo) {
        this.renderer.setProperty(this.adVideo.nativeElement, 'muted', this.isMuted);
      }
    }
    isMuted = true;

    // isMuted = true;

unmuteVideo(video: HTMLVideoElement): void {
  video.muted = false;
}

muteVideo(video: HTMLVideoElement): void {
  video.muted = true;
}

    sanitizeUrl(url: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getTrustedUrl(videoUrl: string): SafeResourceUrl {
      const videoId = this.extractVideoId(videoUrl);
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtu.be/A7_JQnc55EQ${videoId}`);
    }

    togglePlay(video: HTMLVideoElement) {
      if (video.paused) {
          // video.play();
          window.open("https://www.youtube.com/watch?v=d6xvszRQcTA", "_blank");
      } else {
          video.pause();
          // window.open("https://www.youtube.com", "_blank");
      }
  }
  

  private extractVideoId(videoUrl: string): string {
    const url = new URL(videoUrl);
    return url.searchParams.get('v') || '';
  }


  ngOnInit(): void {
   
 
    this.FetchHomeData();
  }



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
  
  const isMemberIn = localStorage.getItem("is_member") === "true"; // Convert the string to a boolean
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  
  if (isMemberIn) {
    this.router.navigate([route]);
  } else {
    
    this.userservice.showMemberModal();
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
      this.router.navigate(["globaltemples",'AllTemples'])

    }
  )
}

navigateToGoshalaFilterCategoryDetail(goshalaCategory: any): void {
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  
  this.router.navigate(["goshala", goshalaCategory],)
    .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}


navigateToGoshalaCategoryDetail():void{
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(["goshala",'AllGoshalas'])
  .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}



navigateToEventFilterCategoryDetail(event:any):void{
  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(["events",event])
  .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}




navigateToEventsCategoryDetail():void{

  let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
  this.router.navigate(["events","AllEvents"])
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






shareNews() {
  const shareUrl = "http://gramadevata.com/home";
  console.log('Share URL:', shareUrl);
  if (navigator.share) {
    navigator.share({
      url: shareUrl
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    console.log('Share API not supported');
  }
}




}

