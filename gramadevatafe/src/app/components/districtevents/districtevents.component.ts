import { Component } from '@angular/core';
import { EventService } from '../../services/eventservice/event.service';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-districtevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './districtevents.component.html',
  styleUrl: './districtevents.component.css'
})
export class DistricteventsComponent {

  District:any;
  blocks:any;
  districtevents:any;

  constructor(private eventservice:EventService, private locationservice:LocationService, private router:Router){ }



  ngOnInit():void{
    this.District= history.state.districts
    this.eventservice.getDistrictevent(this.District._id)
    .subscribe((data:any[])=>{
      this.districtevents=data
    }
    )
    this.locationservice.getblocks(this.District._id)
    .subscribe((data:any[])=>{
      this.blocks=data
    })
  
  }

  navigateblockEvents(blocks:any):void{
    this.router.navigate(["blockevents"],{state:{blocks}})
}

navigateEventdata(event:string):void{
  this.router.navigate(['detailviewevent'],{state:{event}})
}

}
