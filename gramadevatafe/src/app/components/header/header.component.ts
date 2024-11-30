
import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SignupComponent } from '../signup/signup.component';
import { ConnectyourorginComponent } from '../connectyourorgin/connectyourorgin.component';
import { ModalService } from '../../services/modalservice/modal.service';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonService } from '../../services/commonservice/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { ConnectyourtempleComponent } from '../connectyourtemple/connectyourtemple/connectyourtemple.component';
import { UserService } from '../../services/userservice/user.service';
import {  TranslateModule } from '@ngx-translate/core';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
           RouterModule,
           CommonModule,
           NzModalModule,
           NzLayoutModule,
           NzMenuModule, 
           SignupComponent,
           ConnectyourorginComponent,
           NzAvatarModule,
           NzDropDownModule,
           TranslateModule,
           
           
            ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isSmallScreen = window.innerWidth < 992;
  profile_pic:any;
  username:any;
  userid: any;


  constructor(
    private dialog:MatDialog,
    protected authenticationService:AuthenticationService,
    private router:Router,
    private userservice:UserService,
    private renderer: Renderer2
  ){
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  ngOnInit(){
    this.profiledata();
    this.loadGoogleTranslate();
    
  }


  profiledata(){

    this.profile_pic = localStorage.getItem('profile_pic')
    this.username = localStorage.getItem('full_name')
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 992;
  }

  getButtonClasses(): string[] {
    if (this.isSmallScreen) {
      return ['nav-link'];
    } else {
      return ['btn', 'btn-primary', 'rounded-pill'];
    }
  }


  loadGoogleTranslate() {
    // Declare googleTranslateElementInit function if it doesn't exist
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,te,hi,kn,ta,ml,or,bn,as,gu' },
          'google_translate_element'
        );
      };
    }

    // Check if the Google Translate script is already loaded
    if (!window.google || !window.google.translate) {
      const script = this.renderer.createElement('script');
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      this.renderer.appendChild(document.body, script);
    } else {
      // Manually trigger initialization if the script is already loaded
      (window as any).googleTranslateElementInit();
    }
  }


  




  handleProfileImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/profile1.webp';
  }
  

  // doLogout(){
  //   this.authenticationService.logout();
  // }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { displayName: 'signup' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  openContectYourOrginDialog(): void {
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    const dialogRef = this.dialog.open(ConnectyourorginComponent, {
      data: { displayName: 'connectorgin' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  openTempleDialog(): void {
    // this.spinner.show();

    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    const dialogRef = this.dialog.open(ConnectyourtempleComponent, {
      data: { displayName: 'connectorgin' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    // this.spinner.hide();
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  doLogout(){
    this.authenticationService.logout();
  }
  

  navigateToTempleFilters():void{
        this.router.navigate(["globaltemples",'AllTemples'])  
  }

  navigateToGoshalaFilters():void{
    this.router.navigate(["goshala",'AllGoshalas'])  
}

navigateToEventFilters():void{
  this.router.navigate(["events",'AllEvents'])  
}

openPdf() {
  window.open("../../../assets/Gramadevata Foundation note.pdf");
}


navigateTo(): void {
  const ismember = localStorage.getItem('is_member') === 'true'; // Compare as string

  if (ismember) {
    this.userid = localStorage.getItem('user')
    this.router.navigate(['profile',this.userid]);
  } else {
    this.userservice.showMemberModal();
  }
}



openSitemap() {
  window.open('../../../assets/gramadevata_sitemap.pdf', '_blank');
}

}





