import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/eventservice/event.service';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stateevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stateevents.component.html',
  styleUrl: './stateevents.component.css'
})
export class StateeventsComponent {

  Statevent:any;
  Stateventdata:any;
  districts:any;



  constructor(private locationservice:LocationService, private eventservice:EventService,private router:Router){ }

  ngOnInit():void{

    this.fetchstateTemples()
  }

  fetchstateTemples():void{
    this.Statevent = history.state.statedata
    console.log(this.Statevent,"26956652")

    this.eventservice.getStatevent(this.Statevent._id)
    .subscribe(data=>{
      this.Stateventdata=data
    })

    this.locationservice.getdistricts(this.Statevent._id)
    .subscribe((data:any[])=>{
      this.districts=data.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.districts,"/////////////////////////////")
    })
    
  }

  navigateDistEvents(districts:any):void{
    this.router.navigate(["districtevents"],{state:{districts}})
  }

  navigateEventdata(event:string):void{
    this.router.navigate(['detailviewevent'],{state:{event}})
  }

}
