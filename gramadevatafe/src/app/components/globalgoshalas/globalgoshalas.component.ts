import { Component,HostListener } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { finalize, interval, takeUntil,switchMap,Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';


@Component({
  selector: 'app-globalgoshalas',
  standalone: true,
  imports: [CommonModule, TreeViewComponent],
  templateUrl: './globalgoshalas.component.html',
  styleUrl: './globalgoshalas.component.css'
})
export class GlobalgoshalasComponent {

  globalgoshala:any;
  countries:any;
  selectedCategoryId:any;
  selectedLocationId: any;
  currentPage: number = 1;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>();
  country:any;

  constructor(private locationservice:LocationService , private goshalaservice:GoshalaService , private router:Router,private route:ActivatedRoute ){ }

  ngOnInit():void{
    this.countrydata();

    // this.setupAutomationPagination();
    this.selectedLocationId = this.route.snapshot.paramMap.get('id');
    if (this.selectedLocationId) {
      this.applyFilters();
      this.countrydata();

    }

  }

//   fetchGlobalGoshalas():void{
//     this.goshalaservice.getGlobalGoshalas().subscribe(
//       data =>{
//         this.globalgoshala = data.results

//         console.log(this.globalgoshala,"erttr")
//       }
//     )
//   }
  

//   fetchAllCountries(): void {
//     this.locationservice.GetAllCountries()
//         .subscribe((data: any[]) => {
//             this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
//             console.log(this.countries, "659595");
//         });
// }








onCategoryClick(event: NzFormatEmitEvent) {
  this.selectedCategoryId = event.node?.origin?.key; 
  console.log(this.selectedCategoryId,"1111111111111")

  

  this.applyFilters();
  
}



onLocationClick(event: NzFormatEmitEvent) {
  this.selectedLocationId = event.node?.origin?.key;
  console.log(this.selectedLocationId,"222222222222222222")
  
  this.applyFilters();
  this.countrydata()
}

countrydata():void{


  this.locationservice.getIdByCountry(this.selectedLocationId).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.country = data[0]
        console.log(this.country, "1111111111111");
        
      } else {
        console.error('No category data found');
      }
    },
    error => {
      console.error('Error fetching category data', error);
    }
  );
  
}



applyFilters() {
  this.currentPage = 1;
  this.globalgoshala = []; // Clear previous data
  this.loadFilteredTemples();
}

loadFilteredTemples() {
  if (this.selectedCategoryId && this.selectedLocationId) {
    this.goshalaservice.filterGoshalas(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
      (response) => {
        this.globalgoshala = [...this.globalgoshala, ...response.results];
        console.log(this.globalgoshala, "33333333333333333333");
      },
      (error) => {
        console.error('Error fetching filtered temples:', error);
      }
    );
  } else {
    this.goshalaservice.filterGoshalas('',this.selectedLocationId, this.currentPage).subscribe(
      (response) => {
        this.globalgoshala = [...this.globalgoshala, ...response.results];
        console.log(this.globalgoshala, "33333333333333333333");
      },
      (error) => {
        console.error('Error fetching filtered temples:', error);
      }
    );
  }


}

loadMore() {
  this.currentPage++;
  this.loadFilteredTemples();
}

@HostListener('window:scroll', [])
onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    this.loadMore();
  }
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
  this.destroy$.next();
  this.destroy$.complete();
}















navigatecontrybygoshalas(countries:string):void{
  this.router.navigate(["countrygoshalas"],{ state: { countries } })
}

navigategoshaladata(goshala:string):void{
  this.router.navigate(['detailviewgoshala'],{state:{goshala}})
}

}
