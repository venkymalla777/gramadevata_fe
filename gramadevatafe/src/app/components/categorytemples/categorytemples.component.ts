import { Component,HostListener,ViewChild, Output,EventEmitter  } from '@angular/core';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, interval, Subject } from 'rxjs';
import { switchMap, takeUntil, finalize } from 'rxjs/operators';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { LocationsComponent } from '../locations/locations/locations.component';
import { FormGroup,Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LocationService } from '../../services/location/location.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TemplecategoryserviceService } from '../../services/templecategoryservice/templecategoryservice.service';

import { NzTreeModule } from 'ng-zorro-antd/tree';




@Component({
  selector: 'app-categorytemples',
  standalone: true,
  imports: [
    CommonModule,
    TreeViewComponent,
    NgxSpinnerModule,
    LocationsComponent,
    ReactiveFormsModule,
    NzSelectModule,
    NzFormModule,
    NzTreeModule
  ],
  templateUrl: './categorytemples.component.html',
  styleUrl: './categorytemples.component.css'
})
export class CategorytemplesComponent {
  selectedCategoryId:any;
  selectedLocationId: any;
  templesdata:any;
  templeCategorydata:any;
  isLoading: boolean = true; // For initial data loading
  isLoadingNextPage: boolean = false;
  validatorForm!: FormGroup;
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  MandalOptions:any[]=[];
  VillageOptions:any[]=[];
  // currentPage = 1;
  currentPage: number = 1;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>();
  isCategoryTreeDisabled: boolean = false;
  isLocationTreeDisabled: boolean = false;
  @ViewChild('indiaTree') indiaTree!: TreeViewComponent;
  selectedNodeInCategory: any;
  selectedNodeInLocation: any;
  previousCategoryId: string | null = null;
  selectedCategoryId1:string | null = null;
  categoryList: any;

  
  constructor(private templeserviceservice:TempleserviceService,
     private router:Router,
     private route:ActivatedRoute, 
     private spinner:NgxSpinnerService, 
     private fb:FormBuilder,
     private locationservice:LocationService,
     private templeCategoryservice:TemplecategoryserviceService
    ){}





  ngOnInit(): void {
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
    // Load category details
    this.categorydetail();
    this.loadlocations();

  
    // If a category ID is selected, apply filters
    if (this.selectedCategoryId) {
      this.applyFilters();
    }
  }


  


 

  categorydetail():void{
    this.templeserviceservice.getTempleCategorybyId(this.selectedCategoryId).subscribe(data => {
      this.templeCategorydata = data;
      console.log(this.templeCategorydata, "//////////templeCategorydata///////////////");
    });

  }

  
  onCategoryClick(event: NzFormatEmitEvent): void {
    // Update the selected category ID based on the clicked node
    this.selectedCategoryId = event.node?.origin?.key;
    console.log(this.selectedCategoryId, "1111111111111");
  
    // Navigate to the category temples route with the selected category ID
    this.router.navigate(["categorytemples", this.selectedCategoryId]).then(() => {
      // Apply filters and clear data after navigation is complete
      this.applyFilters();
     

    });
  }




  
  


  onLocationClick(event: NzFormatEmitEvent) {
    this.selectedLocationId = event.node?.origin?.key;
    this.applyFilters();
   
    // Handle location click event
  }

  




  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId = [];
    this.applyFilters();
  }

  applyFilters() {
    
    this.currentPage = 1;
    this.templesdata = []; // Clear previous data
    this.loadFilteredTemples();
    
  }


  

  loadFilteredTemples() {
    this.spinner.show()
    if (this.selectedCategoryId && this.selectedLocationId) {
      this.templeserviceservice.filtertemples(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
        (response) => {
          this.templesdata = [...this.templesdata, ...response.results];
          console.log(this.templesdata, "33333333333333333333");
          
        },
        (error) => {
          console.error('Error fetching filtered temples:', error);
        }
      );
    } else {
      this.templeserviceservice.filtertemples(this.selectedCategoryId, '', this.currentPage).subscribe(
        (response) => {
          this.templesdata = [...this.templesdata, ...response.results];
          console.log(this.templesdata, "33333333333333333333");
        },
        (error) => {
          console.error('Error fetching filtered temples:', error);
        }
      );
    }

    this.templeserviceservice.getTempleCategorybyId(this.selectedCategoryId).subscribe(data => {
      this.templeCategorydata = data;
      console.log(this.templeCategorydata, "/////////////////////////");
      this.spinner.hide()
    });
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


  loadlocations(): void {
    this.validatorForm = this.fb.group({
      state: ['', [Validators.required]],
      district: ['', Validators.required],
      mandal: ['', Validators.required],
      village: ['', Validators.required]
    });
  
    // Load states
    this.locationservice.getbyStates("a6e3b35d-d0b0-11ee-ade9-0242ac110002").subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.StateOptions = res.map((state: any) => ({
            label: state.name,
            value: state._id
          }));
          this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));
        } else {
          console.error("Response is not an array type", res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  
    // Initialize form control states
    this.resetFormControls();
  
    // Handle state changes
    this.validatorForm.get('state')?.valueChanges.subscribe(stateID => {
      if (stateID) {
        this.selectedLocationId = stateID; // Store state ID
        console.log('State ID selected:', this.selectedLocationId);
        this.applyFilters()

        this.locationservice.getdistricts(stateID).subscribe(
          (res) => {
            if (Array.isArray(res)) {
              this.DistrictOptions = res.map((district: any) => ({
                label: district.name,
                value: district._id
              }));
              this.DistrictOptions.sort((a, b) => a.label.localeCompare(b.label));
            } else {
              console.error("Response is not an array type", res);
            }
          },
          (err) => {
            console.log(err);
          }
        );
        this.resetDistrictMandalVillage();
        this.validatorForm.get('district')?.enable();
      } else {
        this.resetDistrictMandalVillage();
      }
    });
  
    // Handle district changes
    this.validatorForm.get('district')?.valueChanges.subscribe(districtID => {
      if (districtID) {
        this.selectedLocationId = districtID; // Replace state ID with district ID
        console.log('District ID selected:', this.selectedLocationId);
        this.applyFilters()
        this.locationservice.getblocks(districtID).subscribe(
          (res) => {
            if (Array.isArray(res)) {
              this.MandalOptions = res.map((mandal: any) => ({
                label: mandal.name,
                value: mandal._id
              }));
              this.MandalOptions.sort((a, b) => a.label.localeCompare(b.label));
            } else {
              console.error("Response is not an array type", res);
            }
          },
          (err) => {
            console.log(err);
          }
        );
        this.resetMandalVillage();
        this.validatorForm.get('mandal')?.enable();
      } else {
        this.resetMandalVillage();
      }
    });
  
    // Handle mandal changes
    this.validatorForm.get('mandal')?.valueChanges.subscribe(mandalID => {
      if (mandalID) {
        this.selectedLocationId = mandalID; // Replace district ID with mandal ID
        console.log('Mandal ID selected:', this.selectedLocationId);
        this.applyFilters()
        this.locationservice.getvillages(mandalID).subscribe(
          (res) => {
            if (Array.isArray(res)) {
              this.VillageOptions = res.map((village: any) => ({
                label: village.name,
                value: village._id
              }));
              this.VillageOptions.sort((a, b) => a.label.localeCompare(b.label));
            } else {
              console.error("Response is not an array type", res);
            }
          },
          (err) => {
            console.log(err);
          }
        );
        this.validatorForm.get('village')?.enable();
      } else {
        this.resetVillage();
      }
    });

    this.validatorForm.get('village')?.valueChanges.subscribe(villageID => {
      if (villageID) {
        this.selectedLocationId = villageID; // Replace mandal ID with village ID
        this.applyFilters()
        console.log('Village ID selected:', this.selectedLocationId);
      } else {
        this.resetVillage();
      }
    });
  }
  
  // Helper methods for resetting and disabling form controls
  resetFormControls(): void {
    this.validatorForm.get('state')?.reset();
    this.validatorForm.get('district')?.reset();
    this.validatorForm.get('mandal')?.reset();
    this.validatorForm.get('village')?.reset();
    
    // this.validatorForm.get('district')?.disable();
    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }
  
  resetDistrictMandalVillage(): void {
    this.validatorForm.get('district')?.reset();
    this.validatorForm.get('mandal')?.reset();
    this.validatorForm.get('village')?.reset();
    
    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }
  
  resetMandalVillage(): void {
    this.validatorForm.get('mandal')?.reset();
    this.validatorForm.get('village')?.reset();
    
    // this.validatorForm.get('village')?.disable();
  }
  
  resetVillage(): void {
    this.validatorForm.get('village')?.reset();
  }
  

  navigateTotempleDetail(_id: string): void {
    console.log("Clicked", _id);
    console.log("Navigating to temples with ID:", _id);
    this.router.navigate(['getbytemples', _id])
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }

}
