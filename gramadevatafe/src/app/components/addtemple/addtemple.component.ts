
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { TemplecategoryserviceService } from '../../services/templecategoryservice/templecategoryservice.service';
import { TemplepriorityService } from '../../services/templePriorityservice/templepriority.service';
import { TempleStyle, enumToMap } from '../../enums/temple_style_enum';
import { LocationService } from '../../services/location/location.service';
import { state } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NzUploadModule,NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';



declare var google: any;

@Component({
  selector: 'app-addtemple',
  standalone: true,
  imports: [
        CommonModule,
        NgxSpinnerModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NzUploadModule,
        
      ],
  templateUrl: './addtemple.component.html',
  styleUrls: ['./addtemple.component.css']
})
export class AddtempleComponent implements OnInit {
  templeForm!: FormGroup;
  templeCategoryOptions: any[] = [];
  templePriorityOptions: any[] = [];
  templeStyleOptions: any[] = [];
  containsLocationDetails = false;
  countries: any;
  templeCountryOptions: any[] = [];
  templeStateOptions: any[] = [];
  templeDistrictOptions: any[] = [];
  templeMandalOptions: any[] = [];
  templeVillageOptions: any[] = [];
  countryID:any[]=[];
  formGroup: any;
  bannerFileList: NzUploadFile[] = [];
  imageLocation: string = '';
  fileList: NzUploadFile[] = [];
  villagedata: any;
  villageid:any;
  templeMapLocation: string = '';
  
  


  // formGroup:any;

  constructor(private fb: FormBuilder,
    private templeservice: TempleserviceService,
    private spinner: NgxSpinnerService,
    private templecategoryservice: TemplecategoryserviceService,
    private templepriorityservice: TemplepriorityService,
    private locationservice: LocationService,
    private formBuilder: FormBuilder,
    private router:Router,
  ) {}

  ngOnInit() {
    this.fetchallCategorys();
    this.fetchAllPriority();
    
    

    this.templeForm = this.fb.group({
      
      name: ['', Validators.required],
      is_navagraha_established: [false],
      construction_year: [],
     
      is_destroyed: [false],
      animal_sacrifice_status: [false],
      diety: ['', [Validators.required]],
      style: [""],
      
      temple_map_location: [''],
      address: ['', Validators.required],
      
      desc: [''],
      status: ['ACTIVE'],
      image_location: ['', Validators.required],
      
      category: ['', [Validators.required]],
      priority: ['',[Validators.required]],
      country: ['', [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      mandal: [{ value: '', disabled: true }, [Validators.required]],
      object_id: [{ value: '', disabled: true }, [Validators.required]],
      // deityList: this.fb.array([])
      user:localStorage.getItem('user')
    });
  
    // this.spinner.show();
  
    // Fetch all countries and populate dropdown
    this.templeservice.GetAllCountries().subscribe(
      (res) => {
        this.templeCountryOptions = res.map((country: any) => ({
          label: country.name,
          value: country._id,
        }));
        this.templeCountryOptions.sort((a, b) => a.label.localeCompare(b.label));
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  
    // Listen for changes in the country dropdown and update states accordingly
    this.templeForm.get('country')?.valueChanges.subscribe(countryId => {
      if (countryId) {
        // this.spinner.show();
        this.templeservice.getbyStates(countryId).subscribe(
          (res) => {
            if (Array.isArray(res)) { // Check if res is an array
              this.templeStateOptions = res.map((state: any) => ({
                label: state.name,
                value: state._id,
              }));
              this.templeStateOptions.sort((a, b) => a.label.localeCompare(b.label));
            } else {
              // Handle the case where res is not an array (e.g., error handling)
              console.error("Response is not an array:", res);
            }
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
        // Enable state select and reset districts, mandals, and villages
        this.templeForm.get('state')?.reset();
        this.templeForm.get('state')?.enable();
        this.templeForm.get('district')?.reset();
        this.templeForm.get('mandal')?.reset();
        this.templeForm.get('village')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('mandal')?.disable();
        this.templeForm.get('village')?.disable();
      } else {
        // If no country selected, disable and clear state, district, mandal, and village select
        this.templeForm.get('state')?.reset();
        this.templeForm.get('state')?.disable();
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('mandal')?.reset();
        this.templeForm.get('mandal')?.disable();
        this.templeForm.get('village')?.reset();
        this.templeForm.get('village')?.disable();
      }
    });
    
  
    // Listen for changes in the state dropdown and update districts accordingly
    this.templeForm.get('state')?.valueChanges.subscribe(stateId => {
      if (stateId) {
        // this.spinner.show();
        this.templeservice.getdistricts(stateId).subscribe(
          (res) => {
            this.templeDistrictOptions = res.map((district: any) => ({
              label: district.name,
              value: district._id,
            }));
            this.templeDistrictOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
            // Enable district select and reset mandals and villages
            this.templeForm.get('district')?.enable();
            this.templeForm.get('mandal')?.reset();
            this.templeForm.get('village')?.reset();
            this.templeForm.get('mandal')?.disable();
            this.templeForm.get('village')?.disable();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
      } else {
        // If no state selected, disable and clear district, mandal, and village select
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('mandal')?.reset();
        this.templeForm.get('mandal')?.disable();
        this.templeForm.get('village')?.reset();
        this.templeForm.get('village')?.disable();
      }
    });
  
    // Listen for changes in the district dropdown and update mandals accordingly
    this.templeForm.get('district')?.valueChanges.subscribe(districtId => {
      if (districtId) {
        // this.spinner.show();
        this.templeservice.getblocks(districtId).subscribe(
          (res) => {
            this.templeMandalOptions = res.map((mandal: any) => ({
              label: mandal.name,
              value: mandal._id,
            }));
            this.templeMandalOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
            // Enable mandal select and reset villages
            this.templeForm.get('mandal')?.enable();
            this.templeForm.get('village')?.reset();
            this.templeForm.get('village')?.disable();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
      } else {
        // If no district selected, disable and clear mandal and village select
        this.templeForm.get('mandal')?.reset();
        this.templeForm.get('mandal')?.disable();
        this.templeForm.get('village')?.reset();
        this.templeForm.get('village')?.disable();
      }
    });
  
    // Listen for changes in the mandal dropdown and update villages accordingly
    this.templeForm.get('mandal')?.valueChanges.subscribe(mandalId => {
      if (mandalId) {
        // this.spinner.show();
        this.templeservice.getvillages(mandalId).subscribe(
          (res) => {
            this.templeVillageOptions = res.map((object_id: any) => ({
              label: object_id.name,
              value: object_id._id,
            }));
            this.templeVillageOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
            // Enable village select
            this.templeForm.get('object_id')?.enable();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
      } else {
        // If no mandal selected, disable and clear village select
        this.templeForm.get('object_id')?.reset();
        this.templeForm.get('object_id')?.disable();
      }
    });

    this.templeStyleOptions = enumToMap(TempleStyle);
    this.templeForm.controls['style'].setValue('O');




    this.formGroup = this.formBuilder.group({
      templeIsNavagraha: ['']
    });
    
    
  }

  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         this.templeForm.patchValue({
  //           temple_map_location: `https://www.google.com/maps?q=${lat},${lng}`,
  //         });
  //       },
  //       (error) => {
  //         console.error('Error getting location', error);
  //       }
  //     );
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //   }
  // }



  


   
  // formGroup: FormGroup;

  onSubmit() {
    this.spinner.show();
    if (this.templeForm.valid) {
      const { country, state, district, mandal, ...templeData } = this.templeForm.value;
      console.log(this.templeForm, "999999999999999999")
      this.templeservice.addTemple(templeData)
        .subscribe(response => {
          console.log('Temple added successfully:', response);
          this.villageid = this.templeForm.value.object_id
          console.log(this.villageid)
          this.router.navigate(["villages",templeData.object_id])
          this.spinner.hide()
          // this.router.navigate(['home']);
          // Handle response or redirect to another page
        }, error => {
          console.error('Error adding temple:', error);
          // Handle error
        });
    } else {
      this.templeForm.markAllAsTouched();
      console.log('Form is invalid.');
      this.spinner.hide();
    }
  }

  fetchallCategorys(): void {
    this.templecategoryservice.GetallCategories().subscribe(
      (res) => {
        res.forEach((category: any) => {
          this.templeCategoryOptions.push({
            label: category.name,
            value: category._id,
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchAllPriority(): void {
    this.templepriorityservice.getpriority().subscribe((res) => {
      res.forEach((priority: any) => {
        this.templePriorityOptions.push({
          label: priority.name,
          value: priority._id,
        });
      });
    });
  }

 

  get deityList(): FormArray {
    return this.templeForm.get('deityList') as FormArray;
  }

  addField(): void {
    const newControl = this.fb.control('');
    this.deityList.push(newControl);
    console.log('add field ', this.templeForm.value);
  }

  removeField(index: number): void {
    if (this.deityList.length > 1) {
      this.deityList.removeAt(index);
    }
  }


  handleBannerFileRemove(): void {
    // Handle file remove event if needed
    if (this.bannerFileList.length === 0) {
      // No files remaining, trigger validation message
      this.bannerFileList = [];
    }
  }

  handleBannerFileChange(info: NzUploadChangeParam): void {
    this.handleUpload(info, 'bannerImage');
  }

  handleUpload(info: NzUploadChangeParam, formControlName: string): void {
    const fileList = [...info.fileList];

    fileList.forEach((file: NzUploadFile) => {
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        this.templeForm.patchValue({ image_location: base64String });
        
      });
    });

    this.templeForm.get(formControlName)?.setValue(fileList);

    if (formControlName === 'images') {
      this.fileList = fileList;
    } else if (formControlName === 'bannerImage') {
      this.bannerFileList = fileList;
    }
   console.log('image submit', this.templeForm.value);
  }

  
  // getBase64(file: File, callback: (base64String: string) => void): void {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const base64String = reader.result as string;
  //     console.log('Base64 string:', base64String); // Print base64 string
  //     callback(base64String);
  //   };
  //   reader.readAsDataURL(file);
  // }
  getBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
        let base64String = reader.result as string;
        // Extract base64 string without the data URI scheme
        base64String = base64String.split(',')[1];
        console.log('Base64 string:', base64String); // Print base64 string
        callback(base64String);
    };
    reader.readAsDataURL(file);
}

}
