import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { state } from '@angular/animations';


@Component({
  selector: 'app-countrytemples',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './countrytemples.component.html',
  styleUrl: './countrytemples.component.css'
})
export class CountrytemplesComponent {

  countryid:any;
  countrydata:any;
  countriesdata:any;


  constructor(private templeservice:TempleserviceService, private route:ActivatedRoute){ }

  ngOnInit():void{
    this.fetchCountryData();
  }

  fetchCountryData():void{
    // this.countryid = this.route.snapshot.paramMap.get('_id');
    this.countriesdata = history.state.countries
    console.log(this.countriesdata,"gtrgtrg")
    this.templeservice.getbycountrytemples(this.countriesdata._id).subscribe(
      data=>{
        this.countrydata = data
        console.log(this.countrydata,"5845848")
      }
    )
  }

}
