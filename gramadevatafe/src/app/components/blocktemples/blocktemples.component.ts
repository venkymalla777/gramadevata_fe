import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blocktemples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blocktemples.component.html',
  styleUrl: './blocktemples.component.css'
})
export class BlocktemplesComponent {
  blockdata:any;
  blocktemples:any;
  villages:any;

  constructor(private route:ActivatedRoute, private router:Router,private templeservice:TempleserviceService){ }

  ngOnInit():void{
    this.blockdata = history.state.blocks
    this.templeservice.getBlockTemples(this.blockdata._id)
    .subscribe(data=>{
    this.blocktemples =data
     } )

     this.templeservice.getvillages(this.blockdata._id)
     .subscribe(data=>{
      this.villages=data
     })
     
  }

  navigatetovillagetemples(village:any):void{
    this.router.navigate(["villages",village._id],{state:{village}})
  }
  navigateTotempleDetail(_id:string): void{
    this.router.navigate(['getbytemples',_id])
}

}
