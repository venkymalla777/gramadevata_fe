import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LocationService } from '../../../services/location/location.service';
import { state } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NzUploadModule,NzUploadFile,NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
import { VillageService } from '../../../services/villageservice/village.service';

@Component({
  selector: 'app-addvillage',
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
        NzUploadModule
  ],
  templateUrl: './addvillage.component.html',
  styleUrl: './addvillage.component.css'
})
export class AddvillageComponent {

  templeForm!: FormGroup;
  
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

  constructor(private fb: FormBuilder,
    
    private spinner: NgxSpinnerService,
    private locationservice: LocationService,
    
    private router:Router,
    private villageservice:VillageService
  ) { }


  ngOnInit() {
    this.templeForm = this.fb.group({
      name: ['', Validators.required],
      pin_code: ['', Validators.required],
      desc: [''],
      status: ['INACTIVE'],
      image_location: ['', Validators.required],
      type: ['VILLAGE'],
      country: ['', [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      block: [{ value: '', disabled: true }, [Validators.required]],
      user: localStorage.getItem('user')
    });
  
    // Fetch all countries and populate dropdown
    this.locationservice.GetAllCountries().subscribe(
      (res) => {
        this.templeCountryOptions = res.map((country: any) => ({
          label: country.name,
          value: country._id,
        }));
        this.templeCountryOptions.sort((a, b) => a.label.localeCompare(b.label));
        this.spinner.hide();
        const defaultCountry = this.templeCountryOptions.find(option => option.label === 'India');
        if (defaultCountry) {
          this.templeForm.controls['country'].setValue(defaultCountry.value);
        }
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  
    // Listen for changes in the country dropdown and update states accordingly
    this.templeForm.get('country')?.valueChanges.subscribe(countryId => {
      if (countryId) {
        this.locationservice.getbyStates(countryId).subscribe(
          (res) => {
            this.templeStateOptions = res.map((state: any) => ({
              label: state.name,
              value: state._id,
            }));
            this.templeStateOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
        // Reset and disable dependent fields
        this.templeForm.get('state')?.reset();
        this.templeForm.get('state')?.enable();
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.disable();
      } else {
        // Disable all dependent fields if no country is selected
        this.templeForm.get('state')?.reset();
        this.templeForm.get('state')?.disable();
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.disable();
      }
    });
  
    // Listen for changes in the state dropdown and update districts accordingly
    this.templeForm.get('state')?.valueChanges.subscribe(stateId => {
      if (stateId) {
        this.locationservice.getdistricts(stateId).subscribe(
          (res) => {
            this.templeDistrictOptions = res.map((district: any) => ({
              label: district.name,
              value: district._id,
            }));
            this.templeDistrictOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
        // Reset and disable dependent fields
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.enable();
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.disable();
      } else {
        // Disable district and block if no state is selected
        this.templeForm.get('district')?.reset();
        this.templeForm.get('district')?.disable();
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.disable();
      }
    });
  
    // Listen for changes in the district dropdown and update blocks accordingly
    this.templeForm.get('district')?.valueChanges.subscribe(districtId => {
      if (districtId) {
        this.locationservice.getblocks(districtId).subscribe(
          (res) => {
            this.templeMandalOptions = res.map((mandal: any) => ({
              label: mandal.name,
              value: mandal._id,
            }));
            this.templeMandalOptions.sort((a, b) => a.label.localeCompare(b.label));
            this.spinner.hide();
          },
          (err) => {
            console.log(err);
            this.spinner.hide();
          }
        );
        // Enable block when a district is selected
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.enable();
      } else {
        // Disable block if no district is selected
        this.templeForm.get('block')?.reset();
        this.templeForm.get('block')?.disable();
      }
    });
  }
  
  

  onSubmit() {
    this.spinner.show();
    if (this.templeForm.valid) {
      const { country, state, district, mandal, ...templeData } = this.templeForm.value;
      console.log(this.templeForm, "999999999999999999")
      this.villageservice.addvillage(templeData)
        .subscribe(response => {
          this.spinner.hide();
          console.log('Temple added successfully:', response);
          this.villageid = this.templeForm.value.object_id
          console.log(this.villageid)
          // this.router.navigate(["villages",templeData.object_id])
          this.router.navigate(['home']);
          // Handle response or redirect to another page
        }, error => {
          console.error('Error adding temple:', error);
          this.spinner.hide();
          // Handle error
        });
    } else {
      this.templeForm.markAllAsTouched();
      console.log('Form is invalid.');
      this.spinner.hide();
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
