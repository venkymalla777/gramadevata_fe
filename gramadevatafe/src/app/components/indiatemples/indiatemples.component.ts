// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { TempleserviceService } from '../../services/templeservice/templeservice.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-indiatemples',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './indiatemples.component.html',
//   styleUrl: './indiatemples.component.css'
// })
// export class IndiatemplesComponent {

//   indiatemples:any;
//   indiaTemples: any[] = [];
//   currentPage = 1;
//   subscription: Subscription;


//   constructor(private route:Router, private templeservice:TempleserviceService){ }

//   ngOnInit():void{
//     this.fetchindiantemples();

//   }

//   // fetchindiantemples():void{
//   //   this.templeservice.getbyindiatemplesall()
//   //   .subscribe(data=>{
//   //     this.indiatemples=data.results
//   //   })
//   // }
//   fetchindiantemples(): void {
//     this.subscription = this.templeservice.getbyindiatemplesall(this.currentPage)
//       .subscribe((data: any) => {
//         // Append new data to existing data
//         this.indiaTemples = [...this.indiaTemples, ...data.results];
//         // Increment current page for the next call
//         this.currentPage++;
//       });
//   }


// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { Subscription, interval, Subject } from 'rxjs';
import { switchMap, takeUntil, finalize } from 'rxjs/operators'; // Import finalize operator

@Component({
  selector: 'app-indiatemples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indiatemples.component.html',
  styleUrls: ['./indiatemples.component.css']
})
export class IndiatemplesComponent implements OnInit, OnDestroy {
  indiatemples: any;
  indiaTemples: any[] = [];
  currentPage = 1;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>(); // Subject to manage component destruction
  isLoading: boolean = true; // For initial data loading
  isLoadingNextPage: boolean = false; // For next page loading
  states:any;
  districts:any;
  stateid:any;
  blocks:any;
  blockid:any;
  villageid:any;
  selectedStateId: any;


  constructor(private router: Router,private route:ActivatedRoute, private templeservice: TempleserviceService) { }

  ngOnInit(): void {
    this.fetchIndiaTemples();
    this.setupAutomaticPagination();
    this.fetchStates();
    // this.fetchDistricts();
    // this.fetchBlock();
    // this.fetchVillage();
    // this.data = { displayName: 'state' }; // Example initialization

  }

  fetchIndiaTemples(): void {
    this.subscription = this.templeservice.getbyindiatemplesall(this.currentPage)
      .subscribe((data: any) => {
        this.indiaTemples = [...this.indiaTemples, ...data.results];
        this.currentPage++;
        this.isLoading = false; // Set isLoading to false when initial data is loaded
      });
  }

  setupAutomaticPagination(): void {
    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          this.isLoadingNextPage = true; // Start loading next page
          return this.templeservice.getbyindiatemplesall(this.currentPage);
        }),
        finalize(() => this.isLoadingNextPage = false) // Set isLoadingNextPage to false when next page is loaded
      )
      .subscribe((data: any) => {
        this.indiaTemples = [...this.indiaTemples, ...data.results];
        this.currentPage++;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }


  fetchStates(): void {
    this.templeservice.getStates()
        .subscribe((data: any[]) => {
            this.states = data.sort((a, b) => a.name.localeCompare(b.name));
        });
}



  // fetchDistricts():void {
  //   this.stateid=this.route.snapshot.paramMap.get('id')

  //   this.templeservice.getdistricts(this.stateid)
  //   .subscribe(data=>{
  //     this.districts=data
  //   })
  // }

  


  

  navigateTotempleDetail(_id:string): void{
    this.router.navigate(['getbytemples',_id])
}

navigateTostateTemples(statedata:any) {
  this.router.navigate(["statetemples"],{state:{statedata}})

}

}
