import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location/location.service';
import { EventService } from '../../services/eventservice/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blockevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blockevents.component.html',
  styleUrl: './blockevents.component.css'
})
export class BlockeventsComponent {

  blockdata:any;
  blockevents:any;
  villages:any;

  constructor(private locationservice:LocationService, private eventservice:EventService,private router:Router){ }

  ngOnInit():void{

 
      this.blockdata = history.state.blocks
      console.log(this.blockdata,'cddcscd')
      this.eventservice.getBlockevent(this.blockdata._id)
      .subscribe(data=>{
      this.blockevents =data
      console.log(this.blockevents,"54864")
       } )
  
       this.locationservice.getvillages(this.blockdata._id)
       .subscribe(data=>{
        this.villages=data
       })
       
    }
  
    navigatetovillageEvents(village:any):void{
      this.router.navigate(["villages",village._id],{state:{village}})
    }

    navigateEventdata(event:string):void{
      this.router.navigate(['detailviewevent'],{state:{event}})
    }
  


}
