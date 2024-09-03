import { Component } from '@angular/core';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-countrygoshalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countrygoshalas.component.html',
  styleUrl: './countrygoshalas.component.css'
})
export class CountrygoshalasComponent {


  countriesdata:any;
  countrydata:any;


  constructor(private goshalaservice:GoshalaService , private router:Router){ }


  ngOnInit():void{
    this.fetchCountryData();
  }

  fetchCountryData():void{
    // this.countryid = this.route.snapshot.paramMap.get('_id');
    this.countriesdata = history.state.countries
    console.log(this.countriesdata,"gtrgtrg")
    this.goshalaservice.getCountryGoshalas(this.countriesdata._id).subscribe(
      data=>{
        this.countrydata = data
        console.log(this.countrydata,"5845848")
      }
    )
  }


  navigategoshaladata(goshala:string):void{
    this.router.navigate(['detailviewgoshala'],{state:{goshala}})
  }


}
