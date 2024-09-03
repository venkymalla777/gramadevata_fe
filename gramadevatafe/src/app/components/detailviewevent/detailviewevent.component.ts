import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/commonservice/common.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/eventservice/event.service';

@Component({
  selector: 'app-detailviewevent',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './detailviewevent.component.html',
  styleUrl: './detailviewevent.component.css'
})
export class DetailvieweventComponent {

  commentform!:FormGroup;
  commentText: string = '';
  EventId:any;
  eventdata:any;

  constructor(private commonservice:CommonService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private eventservice:EventService,
  ){}

  

  ngOnInit(): void {

    this.geteventdata();

    this.commentform= this.fb.group({
     
      body:['',Validators.required],
      event:[this.EventId],
      // temple:null,
      user:localStorage.getItem('user')

  })
    
  }

  geteventdata(): void {
    this.EventId = this.route.snapshot.paramMap.get("id");
    this.eventservice.getbyevent(this.EventId).subscribe(
      data => {
        this.eventdata = data;
      }
    );
  }
  
 
  onSubmit() {
    
    const commentdata  = this.commentform.value;

    this.commonservice.addcomment(commentdata).subscribe(
      response => {
        
        this.geteventdata();
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
  



  openMap(url: string): void {
    window.open(url, '_blank');
  }

}
