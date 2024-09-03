import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location/location.service';
import { EventService } from '../../services/eventservice/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indiaevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indiaevents.component.html',
  styleUrl: './indiaevents.component.css'
})
export class IndiaeventsComponent {


  indianEventssdata:any;
  eventsdata:any;
  states:any;


  constructor(private eventservice:EventService, private locationservice:LocationService , private router:Router){ }

  ngOnInit():void{
    this.fetchIndiaGoshalas();
    this.fetchAllstates();
  }

  fetchIndiaGoshalas():void{
    this.eventservice.getIndianEvents().subscribe(
      data =>{
        this.indianEventssdata = data
        this.eventsdata= this.indianEventssdata.results
      }
    )
  }

  fetchAllstates():void{
    this.locationservice.getAllStates().subscribe(
      (data:any[])=>{
        this.states = data.sort((a, b) => a.name.localeCompare(b.name));
      }
    )
  }


  navigateTostateventss(statedata:any) {
    this.router.navigate(["stateEvents"],{state:{statedata}})
  
  }

  navigateEventdata(event:string):void{
    this.router.navigate(['detailviewevent'],{state:{event}})
  }
}
