import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { Route } from '@angular/router';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup ,FormBuilder,Validators } from '@angular/forms';
import { CommonService } from '../../services/commonservice/common.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
import { AddSpaceComponent } from '../add-space/add-space.component';
import { AddSpace1Component } from '../add-space1/add-space1.component';
import { OnlymemberComponent } from '../member/onlymember/onlymember.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-getbygoshala',
  standalone: true,
  imports: [CommonModule,NzModalModule,NzFormModule,ReactiveFormsModule,NgxSpinnerModule,AddSpaceComponent,AddSpace1Component],
  templateUrl: './getbygoshala.component.html',
  styleUrl: './getbygoshala.component.css'
})
export class GetbygoshalaComponent {


  goshaladata:any;
  templeId:any;
  commentText: string = '';
  commentform!:FormGroup

  constructor(private route:ActivatedRoute,
    private router:Router
    ,private goshalaservice:GoshalaService,
     private commanservice:CommonService, 
     private fb:FormBuilder,
     private spinner: NgxSpinnerService,
     private dialog: MatDialog,

    ){}

  ngOnInit():void{
    this.fetchgoshala()

    this.commentform= this.fb.group({
     
        body:['',Validators.required],
        goshala:[this.templeId],
        // temple:null,
        user:localStorage.getItem('user')

    })
    
  }

  fetchgoshala():void{
    this.spinner.show();
    this.templeId = this.route.snapshot.paramMap.get("id")
    this.goshalaservice.getbyGoshala(this.templeId).subscribe(
      data => {
        this.goshaladata = data
        this.spinner.hide()
      }
    )
  }
  openMap(mapLocation: string) {
    if (mapLocation) {
      window.open(mapLocation, '_blank');
    } else {
      console.error('Map location URL is invalid');
    }
  }

  // onSubmit() {
  //       // const ismemberin = localStorage.getItem("is_member") === "true";

  //   const commentdata  = this.commentform.value;

  //   this.commanservice.addcomment(commentdata).subscribe(
  //     response => {
        
  //       this.fetchgoshala();
  //       this.commentform.reset();
        
  //       // Clear the comment text box or any other UI updates
  //       this.commentText = '';
  //     },
  //     error => {
  //       console.error('Error posting comment:', error);
  //       // Handle error as needed
  //     }
  //   );
  // }


    onSubmit() {
    const ismemberin = localStorage.getItem("is_member") === "true";
    const commentdata  = this.commentform.value;
 if(ismemberin){
  
 

    
  const comment = {
    body: commentdata.body,
    goshala: this.route.snapshot.paramMap.get("id"),
    user:localStorage.getItem('user')
};

  

    this.commanservice.addcomment(comment).subscribe(
      response => {
        
        this.fetchgoshala();
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

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/g5.jpg';
  }


  
  
  sharegetbytemple(temple: any) {
    if (!temple || !temple._id) {
      console.error('Invalid temple data provided.');
      return;
    }
  
    const shareUrl = `${window.location.origin}/getbygoshala/${temple._id}`; 
    console.log('Share URL:', shareUrl);
  
    if (navigator.share) {
      navigator.share({
        title: temple.name,
        text: temple.desc || 'Check out this temple!',
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
