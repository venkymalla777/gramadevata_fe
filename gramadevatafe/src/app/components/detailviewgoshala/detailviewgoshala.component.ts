import { Component } from '@angular/core';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { CommonModule } from '@angular/common';
import { Router ,Route,ActivatedRoute} from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-detailviewgoshala',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailviewgoshala.component.html',
  styleUrl: './detailviewgoshala.component.css'
})
export class DetailviewgoshalaComponent {


  goshalaId:any;
  goshaladata:any;

  constructor(){}



  ngOnInit(): void {

    this.goshaladata = history.state.goshala

   
      console.log(this.goshaladata,"***********************152")
    // })
 
    
  }
 
  openMap(url: string): void {
    window.open(url, '_blank');
  }


  


}
