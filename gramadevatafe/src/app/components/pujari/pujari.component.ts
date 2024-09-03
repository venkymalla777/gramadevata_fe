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
  }



  ngOnInit(): void {
    
    this.initializeForm();
    this.connectionsForm();
  }

  connectionsForm(): void {
    this.ConnectForm = this.fb.group(
      {
      connected_as:"PUJARI",
      village: this.villageid,
      user : localStorage.getItem('user')
      }
    );
  }

  

  initializeForm(): void {
    this.memberform = this.fb.group({
      full_name: ["", Validators.required],
      // surname: ['', Validators.required],
      father_name: ['', Validators.required],
      // you_belongs_to_the_village: ['', Validators.required],
      // your_role_in_our_village: ['', Validators.required],
      type:"PUJARI",
      contact_number: ['',Validators.required],
      dob: ['',Validators.required],
      pujari_certificate: ["", Validators.required],
      working_temple:["", Validators.required],
      connected_as:"PUJARI",
      village: this.villageid, 
      user : localStorage.getItem('user')
      
    });
    // this.villageroleoptions = enumToMap(your_role_in_our_village);
    // this.memberform.controls['your_role_in_our_village'].setValue('Villager');
  }

  // onSubmit(): void {
  //   const memberData = this.memberform.value;
  //   this.memberservice.(memberData).subscribe(
  //     response => {
  //       console.log('Member added successfully:', response);
  //       this.memberform.reset();
  //       this.dialogRef.close();
        
  //     },
  //     error => {
  //       console.error('Error adding member:', error);
  //       // Handle error here
  //     }
  //   );
  // }
  onSubmit(): void {
    const userId = localStorage.getItem('user');
    const {connected_as, village, user, ...memberData} = this.memberform.value;
    console.log(memberData,"memberData")
    const { full_name, father_name, contact_number, dob, type, ...connectdata } = this.memberform.value;
    console.log(connectdata,"connectdata")
    if (this.userservice.isMemberIn === false){
    if (userId && memberData) {
      this.memberservice.AddMember(memberData, userId).subscribe(
        response => {
          if (this.apicall === "Connection Temples") {
            this.sharedservice.fetchTempleData();
          } else {
            this.sharedservice.fetchByTempleData();
          }
          console.log('Member added successfully:', response);
          this.memberform.reset();
          this.dialogRef.close();
          this.memberservice.connect(connectdata).subscribe(
            response => {
              console.log(response);
              console.log("connected succesfully1")
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
        if (this.apicall === "Connection Temples") {
          this.sharedservice.fetchTempleData();
        } else {
          this.sharedservice.fetchByTempleData();
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
