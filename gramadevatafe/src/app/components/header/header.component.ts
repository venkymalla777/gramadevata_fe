// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';


// // @Component({
// //   selector: 'app-header',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './header.component.html',
// //   styleUrl: './header.component.css'
// // })
// // export class HeaderComponent {

// // }



import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
import { OnlymemberComponent } from '../member/onlymember/onlymember.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,
           CommonModule,
           NzModalModule,
           NzLayoutModule,
           NzMenuModule, 
           SignupComponent,
           ConnectyourorginComponent,
           NzAvatarModule,
           NzDropDownModule
            ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isSmallScreen = window.innerWidth < 992;


  constructor(
    private dialog:MatDialog,
    protected authenticationService:AuthenticationService,
    private router:Router,
    private userservice:UserService
  ){
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
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


navigateTo(route: string): void {
  const isMemberIn = localStorage.getItem("is_member") === "true"; // Convert the string to a boolean


  if (isMemberIn) {
    this.router.navigate([route]);
  } else {
    this.userservice.showMemberModal();
  }
}






}





