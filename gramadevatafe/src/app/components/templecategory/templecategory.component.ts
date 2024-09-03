import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TemplecategoryserviceService } from '../../services/templecategoryservice/templecategoryservice.service';

@Component({
  selector: 'app-templecategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templecategory.component.html',
  styleUrl: './templecategory.component.css'
})
export class TemplecategoryComponent {

  templecategories:any;

  constructor(private router:Router, private templecategoryservice:TemplecategoryserviceService){ }
    ngOnInit(): void {
      this.FetchAllCategories();

    }


    FetchAllCategories():void{
      this.templecategoryservice.GetallCategories()
      .subscribe(data=>
        this.templecategories =data)
    }

    navigateToCategoryDetail(templeCategory: any): void {
  
  

      this.router.navigate(["temples", templeCategory._id], { state: { templeCategory } })
        .then(() => console.log("Navigation successful"))
        .catch(error => console.error("Navigation failed:", error));
    }
  

}
