import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/commonservice/common.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/eventservice/event.service';
import { AddSpace1Component } from '../add-space1/add-space1.component';
import { AddSpaceComponent } from '../add-space/add-space.component';

@Component({
  selector: 'app-detailviewevent',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AddSpace1Component,AddSpaceComponent],
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
  

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/event.png';
  }

  openMap(url: string): void {
    window.open(url, '_blank');
  }

  sharegetbytemple(temple: any) {
    if (!temple || !temple._id) {
      console.error('Invalid temple data provided.');
      return;
    }
  
    const shareUrl = `${window.location.origin}/detailviewevent/${temple._id}`; 
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
