

import { Component, OnInit ,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/eventservice/event.service';
import { ActivatedRoute,Router } from '@angular/router';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { Subscription, interval, Subject } from 'rxjs';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LocationService } from '../../services/location/location.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userservice/user.service';
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { AddSpaceComponent } from '../add-space/add-space.component';
import { AddSpace1Component } from '../add-space1/add-space1.component';



@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule,TreeViewComponent,NzSelectModule,NzFormModule,ReactiveFormsModule,AddSpaceComponent,AddSpace1Component],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  validatorForm!:FormGroup;
  categoryId: any;
  eventdata: any;
  picdata: any;
  eventcategorydata: any;
  selected = false;
  locationId = '';
  location : any;
  selectedCategoryId:any;
  selectedLocationId: any;
  currentPage: number = 1;
  subscription: Subscription = new Subscription();
  destroy$: Subject<void> = new Subject<void>();
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  MandalOptions:any[]=[];
  VillageOptions:any[]=[];
  CountryOptions: any;
  activeTab: string = 'upcoming'; 
  filtersVisible: boolean = true;
  UpComingeventdata: any;
  Completedeventdata: any;




  constructor(
    private route: ActivatedRoute,
     private eventservice: EventService,
      private router:Router,
      private fb:FormBuilder,
      private locationservice:LocationService,
      private authenticationService:AuthenticationService,
      private userservice:UserService
    ) { }

  ngOnInit(): void {
    
    this.selectedCategoryId = this.route.snapshot.paramMap.get('id');
    if (this.selectedCategoryId ==='AllEvents') {
      console.log(this.selectedCategoryId,"poiuy")
      this.selectedCategoryId = '';
    }
    
    this.loadlocations()
   
    if (this.selectedCategoryId) {
      this.applyFilters();
     
    }
  }

  updateTab(tab: string) {
    this.activeTab = tab;
  }



  

  navigateEventdata(event:string):void{
    this.router.navigate(['detailviewevent',event])
  }


  onCategoryClick(event: NzFormatEmitEvent) {
    this.selectedCategoryId = event.node?.origin?.key; 
    console.log(this.selectedCategoryId,"1111111111111")
    this.router.navigate(["events", this.selectedCategoryId])
    if (this.selectedCategoryId ==='AllEvents') {
      console.log(this.selectedCategoryId,"poiuy")
      this.selectedCategoryId = '';
    }
    

    this.applyFilters();
    
  }




 

  onReset(): void {
    this.validatorForm.reset();
    this.selectedLocationId = null;
    this.applyFilters();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }


  applyFilters() {
    this.currentPage = 1;
    this.eventdata = []; // Clear previous data
    this.loadFilteredTemples();
  }

  loadFilteredTemples() {
    if (this.selectedCategoryId && this.selectedLocationId) {
      this.eventservice.filterEvents(this.selectedCategoryId, this.selectedLocationId, this.currentPage).subscribe(
        (response) => {
          this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
          this.Completedeventdata = [...this.eventdata, ...response.event_completed];
          console.log(this.UpComingeventdata, "33333333333333333333");
          console.log(this.Completedeventdata, "33333333333333333333");
          
        },
        (error) => {
          console.error('Error fetching filtered temples:', error);
        }
      );
    } else if (this.selectedCategoryId){
      this.eventservice.filterEvents(this.selectedCategoryId, '', this.currentPage).subscribe(
        (response) => {
          this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
          this.Completedeventdata = [...this.eventdata, ...response.event_completed];
          console.log(this.UpComingeventdata, "33333333333333333333");
          console.log(this.Completedeventdata, "33333333333333333333");
          
        },
        (error) => {
          console.error('Error fetching filtered temples:', error);
        }
      );
    } else if (this.selectedLocationId){
      this.eventservice.filterEvents('',this.selectedLocationId, this.currentPage).subscribe(
        (response) => {
          this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
          this.Completedeventdata = [...this.eventdata, ...response.event_completed];
          console.log(this.UpComingeventdata, "33333333333333333333");
          console.log(this.Completedeventdata, "33333333333333333333");
          this.eventcategorydata=null
          
        },
        (error) => {
          console.error('Error fetching filtered temples:', error);
        }
      );
    }

    else {
      this.eventservice.GetallEvents().subscribe(
          (response) => {
   
              this.UpComingeventdata = [...this.eventdata, ...response.event_upcoming];
              this.Completedeventdata = [...this.eventdata, ...response.event_completed];
              console.log(this.UpComingeventdata, "33333333333333333333");
              console.log(this.Completedeventdata, "33333333333333333333");
              console.log(this.eventdata, "Filtered Temples without Category or Location");
              this.eventcategorydata=null
          },
          (error) => {
              console.error('Error fetching filtered temples:', error);
          }
      );
  }
  this.eventservice.getByEventCategory(this.selectedCategoryId).subscribe(data => {
    this.eventcategorydata = data;
    console.log(this.eventcategorydata, "/////////////////////////");
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
    
          // Sort the countries alphabetically by label
          this.CountryOptions.sort((a: { label: string; value: any }, b: { label: string; value: any }) =>
            a.label.localeCompare(b.label)
          );
    
          // Find the country object with the label "India"
          const indiaIndex = this.CountryOptions.findIndex((option: { label: string; value: any }) => option.label === 'India');
    
          if (indiaIndex !== -1) {
            // Remove "India" from its current position
            const india = this.CountryOptions.splice(indiaIndex, 1)[0];
    
            // Insert "India" at the beginning of the array
            this.CountryOptions.unshift(india);
          }

          const Country = this.CountryOptions.find((option: { label: string; value: any }) => option.label === 'India');
    
          // Optional: Set the default country if found
          if (Country) {
            this.validatorForm.controls['country'].setValue(Country.value);
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
  

  navigateTo(route: string): void {
  
    const isMemberIn = localStorage.getItem("is_member") === "true"; // Convert the string to a boolean
    let userId = this.authenticationService.getCurrentUser();
      if (userId == undefined || userId == null) {
        this.authenticationService.showLoginModal()
        return;
      }
    
    if (isMemberIn) {
      this.router.navigate([route]);
    } else {
      
      this.userservice.showMemberModal();
    }
  }







}

