import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { finalize, interval, takeUntil,switchMap,Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { LocationService } from '../../services/location/location.service';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';




@Component({
  selector: 'app-globaltemple',
  standalone: true,
  imports: [CommonModule,TreeViewComponent,NzTreeModule,ReactiveFormsModule,NzSelectModule,NzFormModule],
  templateUrl: './globaltemple.component.html',
  styleUrl: './globaltemple.component.css'
})
export class GlobaltempleComponent implements OnInit, OnDestroy {
  globaltemples: any[] = [];

  isLoading = true;
  isLoadingNextPage = false;
  countries:any;
  selectedCategoryId:any;
  selectedLocationId: any;
  currentPage: number = 1;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>();
  country:any;
  templesCount:any;
  validatorForm!:FormGroup;
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  MandalOptions:any[]=[];
  VillageOptions:any[]=[];
  CountryOptions: any[]=[];
  templesdata: any;
  templeCategorydata: any;
  filtersVisible: boolean = true;

  constructor(
              private router:Router,
              private templeserviceservice:TempleserviceService,
              private locationservice:LocationService,
              private route:ActivatedRoute,
               private fb:FormBuilder
              ){ }

  ngOnInit():void{
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
    // Load category details

    this.loadlocations();

  
    // If a category ID is selected, apply filters
    if (this.selectedCategoryId) {
      this.applyFilters();
    }

  }



  onCategoryClick(event: NzFormatEmitEvent) {
    this.selectedCategoryId = event.node?.origin?.key; 
    console.log(this.selectedCategoryId,"1111111111111")
    this.router.navigate(["globaltemples", this.selectedCategoryId])
    this.applyFilters();
    
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






  cleardata(){
    this.selectedCategoryId = []
  }

  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId = null;
    // this.selectedCategoryId = null;
    this.applyFilters();
  }

  applyFilters() {
    this.currentPage = 1;
    this.globaltemples = []; // Clear previous data
    this.loadFilteredTemples();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
  




  loadFilteredTemples() {
    // this.spinner.show()
    if (this.selectedCategoryId && this.selectedLocationId) {
      console.log(this.selectedCategoryId,this.selectedLocationId,"sdfg")
        this.templeserviceservice.filtertemples(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
            (response) => {
                this.globaltemples = [...this.globaltemples, ...response.results];
                console.log(this.globaltemples, "Filtered Temples with Category and Location");
            },
            (error) => {
                console.error('Error fetching Filtered Temples with Category and Location:', error);
            }
        );
    } else if (this.selectedCategoryId) {
      console.log("sdfg123")
        this.templeserviceservice.filtertemples(this.selectedCategoryId, '').subscribe(
            (response) => {
                this.globaltemples = [...this.globaltemples, ...response.results];
                console.log(this.globaltemples, "Filtered Temples with Category");
            },
            (error) => {
                console.error('Error fetching Filtered Temples with Category:', error);
            }
        );
    }else if (this.selectedLocationId) {
      this.templeserviceservice.filtertemples("",this.selectedLocationId, this.currentPage).subscribe(
          (response) => {
              this.globaltemples = [...this.globaltemples, ...response.results];
              console.log(this.globaltemples, "Filtered Temples with Location");
          },
          (error) => {
              console.error('Error fetching Filtered Temples with Location:', error);
          }
      );
  } 
    
    
    
    else {
        this.templeserviceservice.getalltemples().subscribe(
            (response) => {
                this.globaltemples = [...this.globaltemples, ...response.results];
                console.log(this.globaltemples, "Filtered Temples without Category or Location");
            },
            (error) => {
                console.error('Error fetching filtered temples:', error);
            }
        );
    }

    this.templeserviceservice.getTempleCategorybyId(this.selectedCategoryId).subscribe(data => {
        this.templeCategorydata = data;
        console.log(this.templeCategorydata, "Temple Category Data");
        // this.spinner.hide()
    });
}


  loadMore() {
    this.currentPage++;
    this.loadFilteredTemples();
  }

  loadlocations(): void {
    this.validatorForm = this.fb.group({
      country:['',[Validators.required]],
      state: ['', [Validators.required]],
      district: ['', Validators.required],
      mandal: ['', Validators.required],
      village: ['', Validators.required]
    });


    // this.locationservice.GetAllCountries().subscribe(
    //   (res)=>{
    //     if (Array.isArray(res)) {
    //       this.CountryOptions = res.map((country:any) => ({
    //         label:country.name,
    //         value:country._id
    //       }));
    //       this.CountryOptions.sort((a, b) => a.label.localeCompare(b.label));
    //     } else {
    //       console.error("Response is not an array type", res);
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )

    this.locationservice.GetAllCountries().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.CountryOptions = res.map((country: any) => ({
            label: country.name,
            value: country._id
          }));
          this.CountryOptions.sort((a, b) => a.label.localeCompare(b.label));
    
          // Find the country object with the label "India"
          const defaultCountry = this.CountryOptions.find(option => option.label === 'India');
          
          // Set the default country if found
          if (defaultCountry) {
            this.validatorForm.controls['country'].setValue(defaultCountry.value);
          }
        } else {
          console.error("Response is not an array type", res);
          this.CountryFormControls();
        }
      },
      
      (err) => {
        console.log(err);
      }
    );
    
  
    this.validatorForm.get('country')?.valueChanges.subscribe(CountryID => {
      if (CountryID){
        this.selectedLocationId = CountryID; // Store state ID
        this.applyFilters()
        console.log('State ID selected:', this.selectedLocationId);
        console.log("qsdfbg")
        this.locationservice.getbyStates(CountryID).subscribe(
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

      }

    })
   
    
  
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

  CountryFormControls(): void {
    this.validatorForm.get('country')?.reset();
    this.validatorForm.get('state')?.reset();
    this.validatorForm.get('district')?.reset();
    this.validatorForm.get('mandal')?.reset();
    this.validatorForm.get('village')?.reset();
    
    // this.validatorForm.get('district')?.disable();
    // this.validatorForm.get('mandal')?.disable();
    // this.validatorForm.get('village')?.disable();
  }




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



  



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }















  navigateTempleDetail(_id:string):void{
    this.router.navigate(["getbytemples",_id])
  }


}


