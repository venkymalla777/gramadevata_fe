import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { LocationService } from '../../services/location/location.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blockgoshalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blockgoshalas.component.html',
  styleUrl: './blockgoshalas.component.css'
})
export class BlockgoshalasComponent {

  blockdata:any;
  blockgoshalas:any;
  villages:any;

  constructor(private route:ActivatedRoute, private router:Router,private goshalservice:GoshalaService, private locationserbice:LocationService){ }

  ngOnInit():void{
    this.blockdata = history.state.blocks
    this.goshalservice.getBlocksGoshals(this.blockdata._id)
    .subscribe(data=>{
    this.blockgoshalas =data
     } )

     this.locationserbice.getvillages(this.blockdata._id)
     .subscribe(data=>{
      this.villages=data
     })
     
  }

  navigatetovillageGoshals(village:any):void{
    this.router.navigate(["villages",village._id],{state:{village}})
  }

  navigategoshaladata(goshala:string):void{
    this.router.navigate(['detailviewgoshala'],{state:{goshala}})
  }

}
