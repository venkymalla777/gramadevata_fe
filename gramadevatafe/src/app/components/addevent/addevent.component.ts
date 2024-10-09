import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/eventservice/event.service';
import { LocationService } from '../../services/location/location.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService,NgxSpinnerModule } from 'ngx-spinner';



@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [CommonModule,
    NzUploadModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.css'
})
export class AddeventComponent {

  eventform!:FormGroup;
  CountryOptions: any[] = [];
  StateOptions: any[] = [];
  DistrictOptions: any[] = [];
  MandalOptions: any[] = [];
  VillageOptions: any[] = [];
  goshalaCategoryoptions:any[]=[];
  bannerFileList: NzUploadFile[] = [];
  imageLocation: string = '';
  fileList: NzUploadFile[] = [];



  constructor(private eventService:EventService,
    private fb:FormBuilder,
    private router:Router,
    private locationservice:LocationService,
    private spinner: NgxSpinnerService,
    
  ){}

  ngOnInit():void{


    this.fetchallaCategories();


    this.eventform = this.fb.group({

      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date:['', Validators.required],
      start_time: [''],
      end_time:[''],
      // tag: [''],
      // tag_id: [null],
      // tag_type_id: [null],
      // // geo_site: [''],
      // content_type_id: [null],
      // map_location: [''],
      contact_name: ['',Validators.required],
      contact_phone: ['',Validators.required],
      contact_email: [''],
      desc: [''],
      // status: [''],
      address: ['', Validators.required],
      image_location: [''],
      category: ['', Validators.required],
      country: ['', [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      mandal: [{ value: '', disabled: true }, [Validators.required]],
      object_id: [{ value: '', disabled: true }, [Validators.required]],
      user:localStorage.getItem('user'),
      status: ['INACTIVE'],

    });



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



    


    this.eventform.get('country')?.valueChanges.subscribe(countryID =>{
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
        this.eventform.get('state')?.reset();
        this.eventform.get('state')?.enable();
        this.eventform.get('district')?.reset();
        this.eventform.get('mandal')?.reset();
        this.eventform.get('village')?.reset();
        this.eventform.get('district')?.disable();
        this.eventform.get('mandal')?.disable();
        this.eventform.get('village')?.disable();
      } else {
        // If no country selected, disable and clear state, district, mandal, and village select
        this.eventform.get('state')?.reset();
        this.eventform.get('state')?.disable();
        this.eventform.get('district')?.reset();
        this.eventform.get('district')?.disable();
        this.eventform.get('mandal')?.reset();
        this.eventform.get('mandal')?.disable();
        this.eventform.get('village')?.reset();
        this.eventform.get('village')?.disable();
      }
    });


    this.eventform.get('state')?.valueChanges.subscribe(stateID => {
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
        this.eventform.get('district')?.enable();
        this.eventform.get('district')?.reset();
        this.eventform.get('mandal')?.reset();
        this.eventform.get('village')?.reset();
        this.eventform.get('mandal')?.disable();
        this.eventform.get('village')?.disable();
      }
      else {
        this.eventform.get('district')?.enable();
        this.eventform.get('mandal')?.reset();
        this.eventform.get('village')?.reset();
        this.eventform.get('mandal')?.disable();
        this.eventform.get('village')?.disable();
      }
    });

    this.eventform.get('district')?.valueChanges.subscribe((districrID => {
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
      this.eventform.get('mandal')?.enable();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('village')?.disable();
      this.eventform.get('village')?.reset();     
      }
      else{
      this.eventform.get('mandal')?.enable();
      this.eventform.get('mandal')?.reset();
      this.eventform.get('village')?.disable();
      this.eventform.get('village')?.reset();    
      }
    }));


    this.eventform.get('mandal')?.valueChanges.subscribe((mandalId => {
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
        this.eventform.get('object_id')?.enable();
      }
      else {
        this.eventform.get('object_id')?.disable();
        this.eventform.get('object_id')?.reset(); 
      }
    }));


  }


  fetchallaCategories():void{
    this.eventService.getEventCategory().subscribe(
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
    if(this.eventform.valid){
      
    
      const { country, state, district, mandal, ...EventData } = this.eventform.value;
      this.eventService.addevent(EventData)
      // this.router.navigate(["villages",GoshalaData.object_id])
      
      .subscribe(response =>{
        this.spinner.hide();
        console.log("goshala added succesw fully",response)
        this.router.navigate(["villages",EventData.object_id])
        },
        (err)=> {
          console.log(err)
          this.spinner.hide();
        }
       
      )
    }
    else{
      console.log("form is not valid")
      
      this.eventform.markAllAsTouched();
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
        this.eventform.patchValue({ image_location: base64String });
        
      });
    });
  
    this.eventform.get(formControlName)?.setValue(fileList);
  
    if (formControlName === 'images') {
      this.fileList = fileList;
    } else if (formControlName === 'bannerImage') {
      this.bannerFileList = fileList;
    }
   console.log('image submit', this.eventform.value);
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
