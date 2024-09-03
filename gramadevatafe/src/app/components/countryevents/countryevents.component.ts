import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/eventservice/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countryevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countryevents.component.html',
  styleUrl: './countryevents.component.css'
})
export class CountryeventsComponent {

  countriesdata:any;
  countrydata:any;

  constructor(private eventservice:EventService,private router:Router){}



  ngOnInit():void{
    this.fetchCountryData();
  }

  fetchCountryData():void{
    // this.countryid = this.route.snapshot.paramMap.get('_id');
    this.countriesdata = history.state.countries
    console.log(this.countriesdata,"gtrgtrg")
    this.eventservice.getbycountryevents(this.countriesdata._id).subscribe(
      data=>{
        this.countrydata = data
        console.log(this.countrydata,"5845848")
      }
    )
  }

  navigateEventdata(event:string):void{
    this.router.navigate(['detailviewevent'],{state:{event}})
  }

}
