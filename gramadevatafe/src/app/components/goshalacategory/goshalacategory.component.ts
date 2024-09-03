import { Component } from '@angular/core';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goshalacategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goshalacategory.component.html',
  styleUrl: './goshalacategory.component.css'
})
export class GoshalacategoryComponent {
  goshalacategoryies:any;

  constructor(private router:Router , private goshalaservice:GoshalaService){ }

  ngOnInit():void{
    this.fetchgoshalacatageories();

  }

  fetchgoshalacatageories():void{
    this.goshalaservice.getGoshalaCatgeories()
    .subscribe(data=>{
      this.goshalacategoryies=data
    })
  }

  navigateToGoshalaCategoryDetail(goshalaCategory:any):void{
    this.router.navigate(["goshala",goshalaCategory._id],{state:{ goshalaCategory }})
    .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

}
