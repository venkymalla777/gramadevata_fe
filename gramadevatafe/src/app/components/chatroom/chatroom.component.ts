import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chatservice/chat.service';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent {

  chatform!:FormGroup;
  villageId:any;
  membersdata: any;
  chatdata:any;
  chat:any;
  chatBox: any;


  constructor(private route:ActivatedRoute,private chatservice:ChatService,private fb:FormBuilder){ }


  ngOnInit():void{
    this.fetchchatdata();
    this.fetchmembers();
    this.scrollToBottom();
   


    this.chatform= this.fb.group({
     
      message:['',Validators.required],
      

  })

    

    
  }

  fetchmembers():void{
    this.villageId = this.route.snapshot.paramMap.get("id")
    console.log("villageid",this.villageId)

    this.chatservice.GetConnections(this.villageId).subscribe(data =>{
      this.membersdata = data.village
      console.log(this.membersdata,"cccccccc")
    })
  }



  fetchchatdata():void{

    this.villageId = this.route.snapshot.paramMap.get("id")
    this.chatservice.getChat(this.villageId).subscribe(
      data =>{
        this.chatdata = data
        this.scrollToBottom();
      }
    )
  }

  addchat(): void {
    const messageFormData = this.chatform.value;
    console.log("12345");
    this.chat = {
      message: messageFormData.message,
      user: localStorage.getItem('user'),
      village: this.route.snapshot.paramMap.get("id")
    };

    this.chatservice.postchat(this.chat).subscribe(
      data => {
        console.log("Chat added");
        // Update the chat data and scroll to bottom
        // this.chatdata.push({
        //   isSent: true,
        //   user: { name: 'Me' },
        //   message: this.chat.message,
        //   posted_time_ago: 'Just now'
        // });
        this.fetchchatdata();
        this.chatform.reset();
        this.scrollToBottom();
      }
    );
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
