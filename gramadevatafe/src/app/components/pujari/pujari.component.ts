import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/memberservice/member.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/userservice/user.service';
import { SharedService } from '../../services/sharedservice/shared.service';

@Component({
  selector: 'app-pujari',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './pujari.component.html',
  styleUrl: './pujari.component.css'
})
export class PujariComponent {

  memberform!: FormGroup;
  ConnectForm!: FormGroup;
  villageroleoptions: any;
  villageid: any;
  apicall: any;
  templeId: any;
  certificatePlaceholder: string = 'Enter the certificate number';
  certificatePattern: string = '';
  isMemberIn = false
  isPujariIn = false
  userId: any;

 

  constructor(
    private memberservice: MemberService,
    private fb: FormBuilder,
    protected userservice:UserService,
    private sharedservice:SharedService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PujariComponent>
  ) {
    this.villageid = data.villageid; 
    console.log(this.villageid,"ffffsfd")
    this.templeId = data.templeId
  }



  ngOnInit(): void {
    this.getProfileData();
    this.initializeForm();
    this.connectionsForm();
    this.isMemberUser();
  }



  isMemberUser() {
    const isMemberIn = localStorage.getItem("is_member") === "true";
  if (isMemberIn) {
    this.isMemberIn = true
  } else {
    this.isMemberIn = false
  } 
}

  connectionsForm(): void {

    this.ConnectForm = this.fb.group(
      {
      connected_as:"PUJARI",
      village: this.villageid,
      temple:this.templeId,
      user : localStorage.getItem('user')
      }
    );
  }

  onCertificateTypeChange(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;

    switch (selectedType) {
      case 'aadhaar':
        this.certificatePlaceholder = 'Enter Aadhaar Number (xxxx-xxxx-xxxx)';
        this.certificatePattern = '\\d{4}-\\d{4}-\\d{4}'; // Format for Aadhaar
        break;
      case 'pan':
        this.certificatePlaceholder = 'Enter PAN Number (AAAAA9999A)';
        this.certificatePattern = '[A-Z]{5}[0-9]{4}[A-Z]{1}'; // Format for PAN
        break;
      case 'voter':
        this.certificatePlaceholder = 'Enter Voter ID Number (ABC1234567)';
        this.certificatePattern = '[A-Z]{3}[0-9]{7}'; // Format for Voter ID
        break;
      default:
        this.certificatePlaceholder = 'Enter the certificate number';
        this.certificatePattern = '';
    }
  }

  

  initializeForm(): void {
    this.memberform = this.fb.group({
      full_name: ["", Validators.required],
      father_name: ['', Validators.required],
      type:"PUJARI",
      is_member:"true",
      // contact_number: ['',Validators.required],
      contact_number: ['', [Validators.required,Validators.pattern('^[0-9]{10}$'),],],
      // dob: ['',Validators.required],
      gender: ['',Validators.required],
      pujari_certificate: ["", Validators.required],
      working_temple:[""],
      connected_as:"PUJARI",
      village: this.villageid,
      temple:this.templeId,
      user : localStorage.getItem('user'),
      family_images:[''],
      account_type:['PRIVATE',Validators.required],
      email:[''],
      pujari_designation:['']
      
    });
    // this.villageroleoptions = enumToMap(your_role_in_our_village);
    // this.memberform.controls['your_role_in_our_village'].setValue('Villager');
  }

  get contactNumber() {
    return this.memberform.get('contact_number');
  }


  getProfileData() {
    this.userId = localStorage.getItem('user');
    this.userservice.profiledata(this.userId).subscribe((response: any) => {
      this.memberform.patchValue({
        full_name: response.full_name,
        father_name: response.father_name,
        gender: response.gender,
        // dob: response.dob,
        contact_number: response.contact_number,
        email: response.email,
        marital_status:response.marital_status,
        gotram:response.gotram,
        siblings:response.siblings,
        children:response.children,
        wife:response.wife,
        husband:response.husband,
        account_type:response.account_type


      });

      
    });
  }


  onSubmit(): void {
    const userId = localStorage.getItem('user');
    const {connected_as, village, user, ...memberData} = this.memberform.value;
    console.log(memberData,"memberData")
    const { full_name, father_name, contact_number, dob, type, ...connectdata } = this.memberform.value;
    console.log(connectdata,"connectdata")
   if (localStorage.getItem('is_member') === 'false') {
    if (userId && memberData) {
      this.memberservice.AddMember(memberData, userId).subscribe(
        response => {
          if (this.apicall === "Connection Temples") {
            this.sharedservice.fetchTempleData();
            this.sharedservice.fetchVillagedata()
          } else {
            this.sharedservice.fetchByTempleData();
            this.sharedservice.fetchVillagedata()
          }
          
          localStorage.setItem('type', 'PUJARI');
          localStorage.setItem('is_member', 'true');
          console.log('Member added successfully:', response);
          this.memberform.reset();
          this.dialogRef.close();
       
          this.memberservice.connect(connectdata).subscribe(
            response => {
              console.log(response);
              localStorage.setItem('type', 'PUJARI');
              localStorage.setItem('is_member', 'true');
              console.log("connected succesfully1")
              if (this.apicall === "Connection Temples") {
                this.sharedservice.fetchTempleData();
                this.sharedservice.fetchVillagedata()
              } else {
                this.sharedservice.fetchByTempleData();
                this.sharedservice.fetchVillagedata()
              }
              
            },
            error => {
              console.error('Error connecting:', error);
              // Handle connection error here
            }
          );
        
        },
        error => {
          console.error('Error adding member:', error);
          this.memberform.markAllAsTouched()
          // Handle error here, for example, display an error message to the user
        }
      );
    } else {
      console.error('User ID or member data is missing.');
      
      // Handle the missing user ID or member data here
    }
  } else {
    const connectdata = this.ConnectForm.value;
    console.log(connectdata,"connectdata")
    this.memberservice.connect(connectdata).subscribe(
      response => {
        localStorage.setItem('type', 'PUJARI');
        if (this.apicall === "Connection Temples") {
          this.sharedservice.fetchTempleData();
          this.sharedservice.fetchVillagedata()
        } else {
          this.sharedservice.fetchByTempleData();
          this.sharedservice.fetchVillagedata()
        }
        console.log(response);
        this.ConnectForm.reset();
        this.dialogRef.close();
        // this.memberservice.refreshvillagedata();
        console.log("connected succesfully")
      },
      error => {
        console.error('Error connecting:', error);
        // Handle connection error here
      }
    );
  }
}
  

}
