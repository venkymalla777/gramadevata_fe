import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statetemples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statetemples.component.html',
  styleUrl: './statetemples.component.css'
})
export class StatetemplesComponent {
  StateTemples:any;
  StateByTemples:any;
  districts:any;

  constructor(private roue:ActivatedRoute ,private templeservice:TempleserviceService, private router:Router){ }


  ngOnInit():void{

    this.fetchstateTemples();

  }

  fetchstateTemples():void{
    this.StateTemples = history.state.statedata

    this.templeservice.getStatetemples(this.StateTemples._id)
    .subscribe(data=>{
      this.StateByTemples=data
    })

    this.templeservice.getdistricts(this.StateTemples._id)
    .subscribe((data:any[])=>{
      this.districts=data.sort((a, b) => a.name.localeCompare(b.name));
      console.log(this.districts,"/////////////////////////////")
    })
    
  }

  navigateTotempleDetail(_id: string): void {
    console.log("Clicked", _id);
    
    console.log("Navigating to temples with ID:", _id);
    this.router.navigate(['getbytemples', _id])
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

  navigateDistTemples(districts:any):void{
    this.router.navigate(["districttemples"],{state:{districts}})
  }

}
