import { Component } from '@angular/core';
import { ConnectionsService } from '../../../services/connectionservice/connections.service';
import { CommonModule } from '@angular/common';
import { ConnectyourorginComponent } from '../../connectyourorgin/connectyourorgin.component';
import { MatDialog } from '@angular/material/dialog';
import { ConnectyourtempleComponent } from '../../connectyourtemple/connectyourtemple/connectyourtemple.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})
export class ConnectionsComponent {
  connections: any;
  userId: any;
  templeConnections: any;
  villageconnections: any;


  constructor(private ConnectionsService:ConnectionsService,private dialog:MatDialog, private router:Router){}


  ngOnInit():void{
    this.Getconnections();
  }


  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }


  Getconnections():void{
    this.userId = localStorage.getItem('user')
    this.ConnectionsService.GetConnnections(this.userId).subscribe(
      data =>{
        this.connections = data
        console.log(this.connections,"this.connections")
        this.templeConnections= this.connections.temple
        console.log(this.templeConnections,"this.templeConnections")
        this.villageconnections= this.connections.village
      }
    )
  }

  openVillageDialog(): void {
    // this.spinner.show();
    const dialogRef = this.dialog.open(ConnectyourorginComponent, {
      data: { displayName: 'connectorgin' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    // this.spinner.hide();
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  openTempleDialog(): void {
    // this.spinner.show();
    const dialogRef = this.dialog.open(ConnectyourtempleComponent, {
      data: { displayName: 'connectorgin' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    // this.spinner.hide();
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  navigateTempleDetail(_id:string):void{
    this.router.navigate(["getbytemples",_id])
  }


  navigateToVillageDetail(_id:any):void{
    this .router.navigate(['villages',_id])
  }

}
