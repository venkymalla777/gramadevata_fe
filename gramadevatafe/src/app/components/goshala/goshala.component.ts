import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Subscription, interval, Subject } from 'rxjs';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LocationService } from '../../services/location/location.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTreeModule } from 'ng-zorro-antd/tree';


@Component({
  selector: 'app-goshala',
  standalone: true,
  imports: [
    CommonModule,
    TreeViewComponent,
    ReactiveFormsModule,
    NzSelectModule,
    NzTreeModule,
    NzFormModule
  ],
  templateUrl: './goshala.component.html',
  styleUrl: './goshala.component.css'
})
export class GoshalaComponent {
  categoryId:any;
  goshaladata:any;
  goshalaCategorydata:any;
  selected = false;
  locationId = '';
  location : any;
  selectedCategoryId:any;
  selectedLocationId: any;
  currentPage: number = 1;
  templesdata:any;
  subscription: Subscription = new Subscription();
  templeCategorydata:any;
  destroy$: Subject<void> = new Subject<void>();
  validatorForm!: FormGroup;
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  MandalOptions:any[]=[];
  VillageOptions:any[]=[];
  CountryOptions: any;
  filtersVisible: boolean = true;


  constructor(private route:ActivatedRoute,
    private router:Router,
     private goshalaservice:GoshalaService,
     private locationservice:LocationService,
     private fb:FormBuilder
    ){}

  ngOnInit():void{

    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
    if (this.selectedCategoryId ==='AllGoshalas') {
      console.log(this.selectedCategoryId,"poiuy")
      this.selectedCategoryId = '';
    }

    // this.categorydetail();
    this.loadlocations();



    if (this.selectedCategoryId) {
      this.applyFilters();
    }

  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
  
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/g5.jpg';
  }

  navigateTotempleDetail(_id: string): void {
    console.log("Clicked", _id);
    console.log("Navigating to temples with ID:", _id);
    this.router.navigate(['getbygoshala', _id])
      .then(() => console.log("Navigation successful"))
      .catch(error => console.error("Navigation failed:", error));
  }








  onCategoryClick(event: NzFormatEmitEvent) {
    this.selectedCategoryId = event.node?.origin?.key; 
    console.log(this.selectedCategoryId,"1111111111111")
    this.router.navigate(["goshala", this.selectedCategoryId])
    if (this.selectedCategoryId ==='AllGoshalas') {
      console.log(this.selectedCategoryId,"poiuy")
      this.selectedCategoryId = '';
    }
    

    this.applyFilters();
    // this.categorydetail();
  }



  onLocationClick(event: NzFormatEmitEvent) {
    this.selectedLocationId = event.node?.origin?.key;
    this.applyFilters();
  }


  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId = null;
    this.applyFilters();
  }



  applyFilters() {
    this.currentPage = 1;
    this.goshaladata = []; // Clear previous data
    this.loadFilteredTemples();
  }



  loadFilteredTemples() {
    // this.spinner.show()
    if (this.selectedCategoryId && this.selectedLocationId) {
      console.log(this.selectedCategoryId,this.selectedLocationId,"sdfg")
        this.goshalaservice.filterGoshalas(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
            (response) => {
                this.goshaladata = [...this.goshaladata, ...response.results];
                console.log(this.goshaladata, "Filtered Temples with Category and Location");
            },
            (error) => {
                console.error('Error fetching Filtered Temples with Category and Location:', error);
            }
        );
    } else if (this.selectedCategoryId) {
      console.log("sdfg123")
        this.goshalaservice.filterGoshalas(this.selectedCategoryId, '').subscribe(
            (response) => {
                this.goshaladata = [...this.goshaladata, ...response.results];
                console.log(this.goshaladata, "Filtered Temples with Category");
                
            },
            (error) => {
                console.error('Error fetching Filtered Temples with Category:', error);
            }
        );
    }else if (this.selectedLocationId) {
      this.goshalaservice.filterGoshalas("",this.selectedLocationId, this.currentPage).subscribe(
          (response) => {
              this.goshaladata = [...this.goshaladata, ...response.results];
              console.log(this.goshaladata, "Filtered Temples with Location");
              this.goshalaCategorydata=null;
          },
          (error) => {
              console.error('Error fetching Filtered Temples with Location:', error);
          }
      );
  } 
    
    
    
    else {
        this.goshalaservice.GetallGoshalas().subscribe(
            (response) => {
                this.goshaladata = response
                console.log(this.goshaladata, "Filtered Temples without Category or Location");
                this.goshalaCategorydata=null;
            },
            (error) => {
                console.error('Error fetching filtered temples:', error);
            }
        );
    }

    this.goshalaservice.getByGoshalaCatgeories(this.selectedCategoryId).subscribe(data => {
        this.goshalaCategorydata = data;
        console.log(this.goshalaCategorydata, "Temple Category Data");
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
  

    this.locationservice.GetAllCountries().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.CountryOptions = res.map((country: any) => ({
            label: country.name,
            value: country._id
          }));
    
          // Explicitly define the type of a and b
          this.CountryOptions.sort((a: { label: string; value: any }, b: { label: string; value: any }) => 
            a.label.localeCompare(b.label)
          );
    
          // Find the country object with the label "India"
          const defaultCountry = this.CountryOptions.find((option: { label: string; value: any }) => option.label === 'India');
          
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
        this.resetFormControls();
        this.StateOptions = [];
        this.DistrictOptions = [];
        this.MandalOptions = [];
        this.VillageOptions = [];
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
              this.resetFormControls();
            } else {
              console.error("Response is not an array type", res);
              this.resetFormControls();
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
              this.resetVillage();
            } else {
              console.error("Response is not an array type", res);
              this.resetVillage();
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }




}
