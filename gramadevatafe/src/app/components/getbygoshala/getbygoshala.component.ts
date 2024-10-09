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
  openMap(url: string): void {
    window.open(url, '_blank');
  }

  onSubmit() {
    
    const commentdata  = this.commentform.value;

    this.commanservice.addcomment(commentdata).subscribe(
      response => {
        
        this.fetchgoshala();
        this.commentform.reset();
        
        // Clear the comment text box or any other UI updates
        this.commentText = '';
      },
      error => {
        console.error('Error posting comment:', error);
        // Handle error as needed
      }
    );
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/g5.jpg';
  }
  



}
