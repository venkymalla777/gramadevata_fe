import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { LocationService } from '../../services/location/location.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { TempleserviceService } from '../../services/templeservice/templeservice.service';
import { NgxSpinnerService,NgxSpinnerModule } from 'ngx-spinner';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addgoshala',
  standalone: true,
  imports: [
        CommonModule,
        NgxSpinnerModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        ReactiveFormsModule,
        NzUploadModule
      ],
  templateUrl: './addgoshala.component.html',
  styleUrl: './addgoshala.component.css'
})
export class AddgoshalaComponent {
  goshalaForm!: FormGroup;
  containsLocationDetails = false;
  countries: any;
  CountryOptions: any[] = [];
  StateOptions: any[] = [];
  DistrictOptions: any[] = [];
  MandalOptions: any[] = [];
  VillageOptions: any[] = [];
  countryID:any[]=[];
  stateID:any[]=[];
  districrID: any[]=[];
  mandalId:any[]=[];
  goshalaCategoryoptions:any[]=[];
  bannerFileList: NzUploadFile[] = [];
  imageLocation: string = '';
  fileList: NzUploadFile[] = [];



  constructor(private goshalaservice:GoshalaService,
     private fb :FormBuilder,
      private templeservice:TempleserviceService,
       private locationservice:LocationService,
       private router:Router,
       private spinner: NgxSpinnerService,
      ){ }


  ngOnInit(){
    this.fetchallaCategories();
    this.goshalaForm=this.fb.group({
      name:['',Validators.required],
      reg_num:[''],
      category: ['', [Validators.required]],
      contact_name:['', [Validators.required]],
      contact_phone:['', [Validators.required]],
      desc:[''],
      country: ['', [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      mandal: [{ value: '', disabled: true }, [Validators.required]],
      object_id: [{ value: '', disabled: true }, [Validators.required]],
      temple: null,
      image_location:[' '],
      address:['',Validators.required],
      user:localStorage.getItem('user'),
      status: ['INACTIVE'],
    
    })
   

    this.locationservice.GetAllCountries().subscribe(
      (res)=> {
        this.CountryOptions = res.map((country:any) => ({
          label:country.name,
          value:country._id
        }));
        this.CountryOptions.sort((a, b) => a.label.localeCompare(b.label));
        
      },
      (err) => {
        console.log(err);
      }
    );



    


    this.goshalaForm.get('country')?.valueChanges.subscribe(countryID =>{
      if (countryID){
        this.locationservice.getbyStates(countryID).subscribe(
          (res) => {
            if (Array.isArray(res)) {
              this.StateOptions = res.map((state:any) => ({
                label:state.name,
                value:state._id
              }));
              this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));
            }
            else {
              console.error("response is not an array type",res)
            }
          },
          (err) => {
            console.log(err);
          }
        );
        this.goshalaForm.get('state')?.reset();
        this.goshalaForm.get('state')?.enable();
        this.goshalaForm.get('district')?.reset();
        this.goshalaForm.get('mandal')?.reset();
        this.goshalaForm.get('village')?.reset();
        this.goshalaForm.get('district')?.disable();
        this.goshalaForm.get('mandal')?.disable();
        this.goshalaForm.get('village')?.disable();
      } else {
        // If no country selected, disable and clear state, district, mandal, and village select
        this.goshalaForm.get('state')?.reset();
        this.goshalaForm.get('state')?.disable();
        this.goshalaForm.get('district')?.reset();
        this.goshalaForm.get('district')?.disable();
        this.goshalaForm.get('mandal')?.reset();
        this.goshalaForm.get('mandal')?.disable();
        this.goshalaForm.get('village')?.reset();
        this.goshalaForm.get('village')?.disable();
      }
    });


    this.goshalaForm.get('state')?.valueChanges.subscribe(stateID => {
      if(stateID){
        this.locationservice.getdistricts(stateID).subscribe(
          (res) => {
            if (Array.isArray(res)) {
              this.DistrictOptions = res.map((district:any) => ({
                label:district.name,
                value:district._id
              }));
              this.DistrictOptions.sort((a,b) =>a.label.localeCompare(b.label));
            }
            else {
              console.error("response is not an array type",res)
            }
          },
          (err) =>{
            console.log(err);
          }

        );
        this.goshalaForm.get('district')?.enable();
        this.goshalaForm.get('district')?.reset();
        this.goshalaForm.get('mandal')?.reset();
        this.goshalaForm.get('village')?.reset();
        this.goshalaForm.get('mandal')?.disable();
        this.goshalaForm.get('village')?.disable();
      }
      else {
        this.goshalaForm.get('district')?.enable();
        this.goshalaForm.get('mandal')?.reset();
        this.goshalaForm.get('village')?.reset();
        this.goshalaForm.get('mandal')?.disable();
        this.goshalaForm.get('village')?.disable();
      }
    });

    this.goshalaForm.get('district')?.valueChanges.subscribe((districrID => {
      if (districrID){
        this.locationservice.getblocks(districrID).subscribe(res=>{
          if (Array.isArray(res)) {
            this.MandalOptions = res.map((mandal:any) =>({
              label:mandal.name,
              value:mandal._id
            }));
            this.MandalOptions.sort((a,b) =>a.label.localeCompare(b.label));
          }
          else {
            console.error("response is not an array type",res)
          }
          
        },
        (err) =>{
          console.log(err);
        }
      );
      this.goshalaForm.get('mandal')?.enable();
      this.goshalaForm.get('mandal')?.reset();
      this.goshalaForm.get('village')?.disable();
      this.goshalaForm.get('village')?.reset();     
      }
      else{
      this.goshalaForm.get('mandal')?.enable();
      this.goshalaForm.get('mandal')?.reset();
      this.goshalaForm.get('village')?.disable();
      this.goshalaForm.get('village')?.reset();    
      }
    }));


    this.goshalaForm.get('mandal')?.valueChanges.subscribe((mandalId => {
      if (mandalId){
        this.locationservice.getvillages(mandalId).subscribe( res => {
          if (Array.isArray(res)){
          this.VillageOptions = res.map((object_id:any) => ({
            label:object_id.name,
            value:object_id._id
          }));
          this.VillageOptions.sort((a,b)=>a.label.localeCompare(b.label)); 
        }
        else {
          console.error("response is not an array type",res)
        }

      },
      (err) =>{
        console.log(err)
      }
        );
        // this.goshalaForm.get('object_id')?.disable();
        this.goshalaForm.get('object_id')?.enable();
      }
      else {
        this.goshalaForm.get('object_id')?.disable();
        this.goshalaForm.get('object_id')?.reset(); 
      }
    }));



    
  }


  fetchallaCategories():void{
    this.goshalaservice.getGoshalaCatgeories().subscribe(
      (res) => {
        res.forEach((category:any) =>{
          this.goshalaCategoryoptions.push({
            label:category.name,
            value:category._id
          })
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }

 onSubmit() {
  this.spinner.show();
  if(this.goshalaForm.valid){
  
    const { country, state, district, mandal, ...GoshalaData } = this.goshalaForm.value;
    this.goshalaservice.addgoshala(GoshalaData)
    // this.router.navigate(["villages",GoshalaData.object_id])
    
    .subscribe(response =>{
      this.spinner.hide();
      console.log("goshala added succesw fully",response)
      this.router.navigate(["villages",GoshalaData.object_id])
      },
      (err)=> {
        console.log(err)
        this.spinner.hide();
      }
     
    )
  }
  else{
    console.log("form is not valid")
    this.goshalaForm.markAllAsTouched();
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


 handleBannerFileChange(info:NzUploadChangeParam):void {
  this.handleUpload(info, 'bannerImage');
 }

 handleUpload(info: NzUploadChangeParam, formControlName: string): void {
  const fileList = [...info.fileList];

  fileList.forEach((file: NzUploadFile) => {
    this.getBase64(file.originFileObj!, (base64String: string) => {
      file['base64'] = base64String;
      this.goshalaForm.patchValue({ image_location: base64String });
      
    });
  });

  this.goshalaForm.get(formControlName)?.setValue(fileList);

  if (formControlName === 'images') {
    this.fileList = fileList;
  } else if (formControlName === 'bannerImage') {
    this.bannerFileList = fileList;
  }
 console.log('image submit', this.goshalaForm.value);
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


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { GoshalaService } from '../../services/goshalaservice/goshala.service';
// import { LocationService } from '../../services/location/location.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TempleserviceService } from '../../services/templeservice/templeservice.service';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { Subscription } from 'rxjs';
// import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
// import { ReactiveFormsModule } from '@angular/forms';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzUploadModule } from 'ng-zorro-antd/upload';

// @Component({
//   selector: 'app-addgoshala',
//   standalone: true,
//   imports: [
//     CommonModule,
//     NgxSpinnerModule,
//     NzFormModule,
//     NzInputModule,
//     NzSelectModule,
//     ReactiveFormsModule,
//     NzUploadModule
//   ],
//   templateUrl: './addgoshala.component.html',
//   styleUrls: ['./addgoshala.component.css']
// })
// export class AddgoshalaComponent {
//   goshalaForm!: FormGroup;
//   containsLocationDetails = false;
//   CountryOptions: any[] = [];
//   StateOptions: any[] = [];
//   DistrictOptions: any[] = [];
//   MandalOptions: any[] = [];
//   VillageOptions: any[] = [];
//   goshalaCategoryoptions: any[] = [];
//   bannerFileList: NzUploadFile[] = [];
//   imageLocation: string = '';
//   fileList: NzUploadFile[] = [];

//   constructor(
//     private goshalaservice: GoshalaService,
//     private fb: FormBuilder,
//     private templeservice: TempleserviceService,
//     private locationservice: LocationService
//   ) {}

//   ngOnInit() {
//     this.fetchallaCategories();
//     this.goshalaForm = this.fb.group({
//       name: ['', Validators.required],
//       reg_num: ['', Validators.required],
//       category: ['', Validators.required],
//       country: ['', Validators.required],
//       state: [{ value: '', disabled: true }, Validators.required],
//       district: [{ value: '', disabled: true }, Validators.required],
//       mandal: [{ value: '', disabled: true }, Validators.required],
//       object_id: [{ value: '', disabled: true }, Validators.required],
//       user: null,
//       temple: null,
//       image_location: [''],
//       address: ['', Validators.required]
//     });

//     // Fetch countries
//     this.locationservice.GetAllCountries().subscribe(
//       (res) => {
//         this.CountryOptions = res.map((country: any) => ({
//           label: country.name,
//           value: country._id
//         }));
//         this.CountryOptions.sort((a, b) => a.label.localeCompare(b.label));
//       },
//       (err) => {
//         console.log(err);
//       }
//     );

//     // Handle country value changes
//     this.goshalaForm.get('country')?.valueChanges.subscribe((countryID) => {
//       if (countryID) {
//         this.locationservice.getbyStates(countryID).subscribe(
//           (res) => {
//             if (Array.isArray(res)) {
//               this.StateOptions = res.map((state: any) => ({
//                 label: state.name,
//                 value: state._id
//               }));
//               this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));
//             } else {
//               console.error("response is not an array type", res);
//             }
//           },
//           (err) => {
//             console.log(err);
//           }
//         );

//         // Reset and enable controls
//         this.resetAndEnableControls(['state', 'district', 'mandal', 'village']);
//       } else {
//         // Reset and disable controls
//         this.resetAndDisableControls(['state', 'district', 'mandal', 'village']);
//       }
//     });

//     // Handle state value changes
//     this.goshalaForm.get('state')?.valueChanges.subscribe((stateID) => {
//       if (stateID) {
//         this.locationservice.getdistricts(stateID).subscribe(
//           (res) => {
//             if (Array.isArray(res)) {
//               this.DistrictOptions = res.map((district: any) => ({
//                 label: district.name,
//                 value: district._id
//               }));
//               this.DistrictOptions.sort((a, b) => a.label.localeCompare(b.label));
//             } else {
//               console.error("response is not an array type", res);
//             }
//           },
//           (err) => {
//             console.log(err);
//           }
//         );

//         // Reset and enable controls
//         this.resetAndEnableControls(['district', 'mandal', 'village']);
//       } else {
//         // Reset and disable controls
//         this.resetAndDisableControls(['district', 'mandal', 'village']);
//       }
//     });

//     // Handle district value changes
//     this.goshalaForm.get('district')?.valueChanges.subscribe((districtID) => {
//       if (districtID) {
//         this.locationservice.getblocks(districtID).subscribe(
//           (res) => {
//             if (Array.isArray(res)) {
//               this.MandalOptions = res.map((mandal: any) => ({
//                 label: mandal.name,
//                 value: mandal._id
//               }));
//               this.MandalOptions.sort((a, b) => a.label.localeCompare(b.label));
//             } else {
//               console.error("response is not an array type", res);
//             }
//           },
//           (err) => {
//             console.log(err);
//           }
//         );

//         // Reset and enable controls
//         this.resetAndEnableControls(['mandal', 'village']);
//       } else {
//         // Reset and disable controls
//         this.resetAndDisableControls(['mandal', 'village']);
//       }
//     });

//     // Handle mandal value changes
//     this.goshalaForm.get('mandal')?.valueChanges.subscribe((mandalId) => {
//       if (mandalId) {
//         this.locationservice.getvillages(mandalId).subscribe(
//           (res) => {
//             if (Array.isArray(res)) {
//               this.VillageOptions = res.map((village: any) => ({
//                 label: village.name,
//                 value: village._id
//               }));
//               this.VillageOptions.sort((a, b) => a.label.localeCompare(b.label));
//             } else {
//               console.error("response is not an array type", res);
//             }
//           },
//           (err) => {
//             console.log(err);
//           }
//         );

//         // Enable object_id control
//         this.goshalaForm.get('object_id')?.enable();
//       } else {
//         // Reset and disable object_id control
//         this.goshalaForm.get('object_id')?.reset();
//         this.goshalaForm.get('object_id')?.disable();
//       }
//     });
//   }

//   fetchallaCategories(): void {
//     this.goshalaservice.getGoshalaCatgeories().subscribe(
//       (res) => {
//         res.forEach((category: any) => {
//           this.goshalaCategoryoptions.push({
//             label: category.name,
//             value: category._id
//           });
//         });
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }

//   onSubmit() {
//     if (this.goshalaForm.valid) {
//       const { country, state, district, mandal, ...GoshalaData } = this.goshalaForm.value;
//       this.goshalaservice.addgoshala(GoshalaData).subscribe(
//         (response) => {
//           console.log("goshala added successfully", response);
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//     } else {
//       console.log("form is not valid");
//     }
//   }

//   handleBannerFileChange(info: NzUploadChangeParam): void {
//     this.handleUpload(info, 'bannerImage');
//   }

//   handleUpload(info: NzUploadChangeParam, formControlName: string): void {
//     const fileList = [...info.fileList];

//     fileList.forEach((file: NzUploadFile) => {
//       this.getBase64(file.originFileObj!, (base64String: string) => {
//         file['base64'] = base64String;
//         this.goshalaForm.patchValue({ image_location: base64String });
//       });
//     });

//     this.goshalaForm.get(formControlName)?.setValue(fileList);

//     if (formControlName === 'images') {
//       this.fileList = fileList;
//     } else if (formControlName === 'bannerImage') {
//       this.bannerFileList = fileList;
//     }

//     console.log('image submit', this.goshalaForm.value);
//   }

//   getBase64(file: File, callback: (base64String: string) => void): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       let base64String = reader.result as string;
//       // Extract base64 string without the data URI scheme
//       base64String = base64String.split(',')[1];
//       console.log('Base64 string:', base64String); // Print base64 string
//       callback(base64String);
//     };
//     reader.readAsDataURL(file);
//   }

//   private resetAndEnableControls(controlNames: string[]): void {
//     controlNames.forEach((controlName) => {
//       this.goshalaForm.get(controlName)?.reset();
//       this.goshalaForm.get(controlName)?.enable();
//     });
//   }

//   private resetAndDisableControls(controlNames: string[]): void {
//     controlNames.forEach((controlName) => {
//       this.goshalaForm.get(controlName)?.reset();
//       this.goshalaForm.get(controlName)?.disable();
//     });
//   }
// }

