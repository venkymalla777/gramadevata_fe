import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,FormControl, FormArray} from '@angular/forms';
import { MemberService } from '../../../services/memberservice/member.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/userservice/user.service';

import { SharedService } from '../../../services/sharedservice/shared.service';

@Component({
  selector: 'app-onlymember',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './onlymember.component.html',
  styleUrl: './onlymember.component.css'
})
export class OnlymemberComponent {
  memberform!: FormGroup;
  templeId:any;
  apicall: any;
  isMemberIn = false
  isPujariIn = false
  full_name: any;






  // constructor(){}
  constructor(
    private memberservice: MemberService,
    private fb: FormBuilder,
    private userservice:UserService,

    private sharedservice:SharedService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OnlymemberComponent>
  ) {
    this.templeId = data.templeId; 
    this.apicall = data.api
    console.log(this.templeId,"ffffsfd")
  }

  ngOnInit():void{
    this.initializeForm()
  }

  isMemberUser() {
    const isMemberIn = localStorage.getItem("is_member") === "true";
  if (isMemberIn) {
    this.isMemberIn = true
  } else {
    this.isMemberIn = false
  } 
}

  initializeForm(): void {
    console.log("wdefrgbh")
    this.memberform = this.fb.group({
      full_name: ["", Validators.required],
      
      father_name: ['', Validators.required],
     
      contact_number: ['',Validators.required],
      // dob: ['',Validators.required],
      gender: ['',Validators.required],
      type:'MEMBER',
      is_member:"true",
      // family_images:[],
      temple: this.templeId,
      user : localStorage.getItem('user'),
      account_type:['PRIVATE',Validators.required],
      email:['']
      
    });
   
  }


  // onSubmit(): void {
    
  //     const userId = localStorage.getItem('user');
     
      
  //     const connectdata  = this.memberform.value;
  
  //     this.memberservice.AddMember(connectdata, userId).subscribe(
  //       response => {
  //         console.log('Member added successfully:', response);
  //       this.userservice.isMemberIn = true
  //         this.memberform.reset();
  //         this.dialogRef.close();
  //         // this.memberservice.refreshvillagedata();
          
  //         this.memberservice.connect(connectdata).subscribe(
  //           response => {
  //             console.log(response);
  //             if (this.apicall=="Connection Temples"){
  //               this.sharedservice.fetchTempleData()
  //             }else {
  //               this.sharedservice.fetchByTempleData()
  //             }
  //           },
  //           error => {
  //             console.error('Error connecting:', error);
  //             // Handle connection error here
  //           }
  //         );
  //       },
  //       error => {
  //         console.error('Error adding member:', error);
  //         this.memberform.markAllAsTouched();

  //         // Handle add member error here
  //       }
  //     );
    

  // }


  onSubmit(): void {
    if (!this.memberform.valid) {
      this.memberform.markAllAsTouched();
      return; // Exit if form is not valid
    }
  
    const userId = localStorage.getItem('user');
    if (!userId) {
      console.error('User ID not found in local storage.');
      return; // Exit if userId is not available
    } 
  
    const connectdata = this.memberform.value;
  
    this.memberservice.AddMember(connectdata, userId).subscribe(
      response => {
        console.log('Member added successfully:', response);
        localStorage.setItem('is_member', 'true');
        this.full_name = this.memberform.get('full_name')?.value || ''; 
        localStorage.setItem('full_name', this.full_name);
        // this.userservice.isMemberIn = true;
        this.memberform.reset();
        this.dialogRef.close();
        window.location.reload();
 
        // Make the connection call after successfully adding the member
        if (this.templeId){
        this.memberservice.connect(connectdata).subscribe(
          connectResponse => {
            console.log('Connected successfully:', connectResponse);
            if (this.apicall === "Connection Temples") {
              this.sharedservice.fetchTempleData();
              this.memberform.reset();
            } else {
              this.sharedservice.fetchByTempleData();
            }
          },
          connectError => {
            console.error('Error connecting:', connectError);
            // Handle connection error here
          }
        );
      }
      },
      addMemberError => {
        console.error('Error adding member:', addMemberError);
        this.memberform.markAllAsTouched();
        // Handle add member error here
      }
    );
  }
  

}
