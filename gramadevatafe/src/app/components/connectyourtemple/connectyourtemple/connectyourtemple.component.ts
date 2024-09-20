import { Component } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { INDIA } from '../../../constants';
import { AuthenticationService } from '../../../services/authenticationservice/authentication.service';



@Component({
  selector: 'app-connectyourtemple',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NzButtonModule,NzSelectModule,NzFormModule,NgxSpinnerModule],
  templateUrl: './connectyourtemple.component.html',
  styleUrl: './connectyourtemple.component.css'
})
export class ConnectyourtempleComponent {


  validatorForm!: FormGroup;
  StateOptions:any[]=[];
  DistrictOptions:any[]=[];
  MandalOptions:any[]=[];
  VillageOptions:any[]=[];
  country: any;

  constructor(private locationservice:LocationService,
    private fb:FormBuilder,
    private router : Router,
    public dialogRef: MatDialogRef<ConnectyourtempleComponent>,
    private spinner: NgxSpinnerService,
    private authenticationService:AuthenticationService
   ) { }

   ngOnInit(){
    // this.formDisplayService.showForm();

    this.validatorForm = this.fb.group({
      country:[''],
      state:['',[Validators.required]],
      district:['',Validators.required],
      mandal:['',Validators.required],
      village:['',Validators.required]
    })

    this.locationservice.getNameByCountry('INDIA').subscribe(
      data => {
        if (data && data.length > 0) {
          this.country = data[0]._id;
          console.log(this.country, "this.country");
    
          // Set the country ID in the form
          this.validatorForm.patchValue({
            country: this.country
          });
    
          // Fetch states based on the country ID
          this.locationservice.getbyStates(this.country).subscribe(
            res => {
              this.StateOptions = res.map((state: any) => ({
                label: state.name,
                value: state._id,
              }));
              this.StateOptions.sort((a, b) => a.label.localeCompare(b.label));
            },
            err => {
              console.error('Error fetching states:', err);
            }
          );
        } else {
          console.error('No country found for the provided name.');
        }
      },
      err => {
        console.error('Error fetching country ID:', err);
      }
    );
  this.validatorForm.get('state')?.valueChanges.subscribe(stateId => {
    if(stateId){
      this.locationservice.getdistricts(stateId).subscribe(
        (res)=>{
          this.DistrictOptions = res.map((district:any)=>({
            label:district.name,
            value:district._id,
          

          }));
          this.DistrictOptions.sort((a,b) =>a.label.localeCompare(b.label));

        },
        (err)=>{
          console.log(err)
        }

      );
      this.validatorForm.get('district')?.reset();
      this.validatorForm.get('district')?.enable();
      this.validatorForm.get('mandal')?.reset();
      this.validatorForm.get('viilage')?.reset();
      this.validatorForm.get('mandal')?.disable();
      this.validatorForm.get('village')?.disable();
    }
    else {
      this.validatorForm.get('district')?.reset();
      this.validatorForm.get('district')?.disable();
      this.validatorForm.get('mandal')?.reset();
      this.validatorForm.get('viilage')?.reset();
      this.validatorForm.get('mandal')?.disable();
      this.validatorForm.get('village')?.disable();
    }
  })

  this.validatorForm.get('district')?.valueChanges.subscribe(DistrictId =>{
    if (DistrictId) {
      this.locationservice.getblocks(DistrictId).subscribe(
        (res) =>{
          this.MandalOptions = res.map((mandal:any)=>({
            label:mandal.name,
            value:mandal._id,
          }));
          this.MandalOptions.sort((a,b)=> a.label.localeCompare(b.label))
        },
        (err)=>{
          console.log(err)
        }
      );
      this.validatorForm.get('mandal')?.enable();
      this.validatorForm.get('mandal')?.reset();
      this.validatorForm.get("village")?.reset();
      this.validatorForm.get("village")?.disable();
    }
    else{
      this.validatorForm.get('mandal')?.disable();
      this.validatorForm.get('mandal')?.reset();
      this.validatorForm.get("village")?.reset();
      this.validatorForm.get("village")?.disable();
    }  
  })

  this.validatorForm.get('mandal')?.valueChanges.subscribe(MandalId=>{
    if (MandalId){
    this.locationservice.getvillages(MandalId).subscribe(
      (res)=>{
        this.VillageOptions=res.map((village:any)=>({
          label:village.name,
          value:village._id,
        }));
        this.VillageOptions.sort((a,b)=>a.label.localeCompare(b.label))
      },
      (err)=>{
        console.log(err)
      }
    );  
    this.validatorForm.get('village')?.enable()
  }
  else {
    this.validatorForm.get('village')?.disable()
  }
  })

  }

  OnSubmit():void{
    
    
    const VillageId = this.validatorForm.value.village
    this.router.navigate(["temples",VillageId])
    this.dialogRef.close();

  }

  navigate():void{
    let userId = this.authenticationService.getCurrentUser();
    if (userId == undefined || userId == null) {
      this.authenticationService.showLoginModal()
      return;
    }
    this.router.navigate(["addvillage"])
    this.dialogRef.close();

  }

}
