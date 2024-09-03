import { Component } from '@angular/core';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location/location.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-districtgoshalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './districtgoshalas.component.html',
  styleUrl: './districtgoshalas.component.css'
})
export class DistrictgoshalasComponent {

  District:any;
  districtgoshalas:any;
  blocks:any;

  constructor(private route:ActivatedRoute,private goshalservice:GoshalaService,private router:Router,private locationservice:LocationService){ }

  ngOnInit():void{
    this.District= history.state.districts
    this.goshalservice.getDistrictGoshalas(this.District._id)
    .subscribe((data:any[])=>{
      this.districtgoshalas=data
    }
    )
    this.locationservice.getblocks(this.District._id)
    .subscribe((data:any[])=>{
      this.blocks=data
    })
  
  }

  navigateblockgoshals(blocks:any):void{
    this.router.navigate(["blockgoshalas"],{state:{blocks}})
}

navigategoshaladata(goshala:string):void{
  this.router.navigate(['detailviewgoshala'],{state:{goshala}})
}

}
