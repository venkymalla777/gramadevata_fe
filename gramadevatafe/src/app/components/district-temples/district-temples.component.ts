import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-district-temples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './district-temples.component.html',
  styleUrl: './district-temples.component.css'
})
export class DistrictTemplesComponent {

  District:any;
  blocks:any;
  districttemples:any;

  constructor(private route:ActivatedRoute,private templeservice:TempleserviceService,private router:Router){ }

  ngOnInit():void{
    this.District= history.state.districts
    this.templeservice.getDistrictsTemples(this.District._id)
    .subscribe((data:any[])=>{
      this.districttemples=data
    }
    )
    this.templeservice.getblocks(this.District._id)
    .subscribe((data:any[])=>{
      this.blocks=data
    })
  
  }
  navigateTotempleDetail(_id:string): void{
    this.router.navigate(['getbytemples',_id])
}
  navigateblock(blocks:any):void{
    this.router.navigate(["blocktemples"],{state:{blocks}})
}

}
