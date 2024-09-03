import { Component } from '@angular/core';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-indiagoshalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indiagoshalas.component.html',
  styleUrl: './indiagoshalas.component.css'
})
export class IndiagoshalasComponent {

  indiangoshalasdata:any;
  states:any;
  goshaladata:any;


  constructor(private goshalaservice:GoshalaService , private router:Router,private locationservice:LocationService){}

  ngOnInit():void{
    this.fetchIndiaGoshalas();
    this.fetchAllstates();

  }

  fetchIndiaGoshalas():void{
    this.goshalaservice.getindiagoshalas().subscribe(
      data =>{
        this.indiangoshalasdata = data
        this.goshaladata= this.indiangoshalasdata.results
        console.log(this.goshaladata,"vvvv")
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


  navigateTostateGoshalas(statedata:any) {
    this.router.navigate(["stategoshalas"],{state:{statedata}})
  
  }

  navigategoshaladata(goshala:string):void{
    this.router.navigate(['detailviewgoshala'],{state:{goshala}})
  }

}
