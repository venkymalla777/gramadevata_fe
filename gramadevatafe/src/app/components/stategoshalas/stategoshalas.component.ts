import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location/location.service';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-stategoshalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stategoshalas.component.html',
  styleUrl: './stategoshalas.component.css'
})
export class StategoshalasComponent {

  Stategoshalas:any;
  Stategoshalasdata:any;
  districts:any

  constructor(private locationservice:LocationService, private goshalaservice:GoshalaService,private router:Router){}

  ngOnInit():void{
    this.fetchstateTemples();

  }

  fetchstateTemples():void{
    this.Stategoshalas = history.state.statedata

    this.goshalaservice.getStateGoshalas(this.Stategoshalas._id)
    .subscribe(data=>{
      this.Stategoshalasdata=data
    })

    this.locationservice.getdistricts(this.Stategoshalas._id)
    .subscribe((data:any[])=>{
      this.districts=data.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.districts,"/////////////////////////////")
    })
    
  }

  navigateDistGoshalas(districts:any):void{
    this.router.navigate(["districtgoshalas"],{state:{districts}})
  }

  navigategoshaladata(goshala:string):void{
    this.router.navigate(['detailviewgoshala'],{state:{goshala}})
  }

}
