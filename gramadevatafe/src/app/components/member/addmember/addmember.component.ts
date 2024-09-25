
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,FormControl, FormArray} from '@angular/forms';
import { MemberService } from '../../../services/memberservice/member.service';
import { your_role_in_our_village, enumToMap } from '../../../enums/member_role';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../../../services/userservice/user.service';
import { SharedService } from '../../../services/sharedservice/shared.service';



@Component({
  selector: 'app-addmember',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NzInputModule,NzFormModule],
  templateUrl: './addmember.component.html',
  styleUrl: './addmember.component.css'
})
export class AddmemberComponent implements OnInit {
  memberform!: FormGroup;
  ConnectForm!:FormGroup;
  villageroleoptions: any;
  villageid: any;
  connectdata:any;
  isMember=false;
  isMemberIn=false

  

  constructor(
    private memberservice: MemberService,
    private fb: FormBuilder,
    protected userservice:UserService,
    private sharedservice:SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddmemberComponent>
  ) {
    this.villageid = data.villageid; 
    console.log(this.villageid,"ffffsfd")
  }



  ngOnInit(): void {
    this.initializeForm();
    this.connectionsForm();
    this.isMemberUser();
  }


  get selectedCheckboxes(): FormArray {
    return this.memberform.get('belongs_as') as FormArray;
  }


  isMemberUser() {
    const isMemberIn = localStorage.getItem("is_member") === "true";
  if (isMemberIn) {
    this.isMemberIn = true
  } else {
    this.isMemberIn = false
  } 
}


  checkboxes = [
    {
      label: 'I was born here',
      value: 'BORN_HERE',
      formControl: new FormControl(false),
    },
    {
      label: 'I was Boughtup here',
      value: 'BOUGHTUP_HERE',
      formControl: new FormControl(false),
    },
    {
      label: 'I was educated here',
      value: 'EDUCATED_HERE',
      formControl: new FormControl(false),
    },
    {
      label: 'My father"s village',
      value: 'FATHERS_VILLAGE',
      formControl: new FormControl(false),
    },
    {
      label: 'My Mother"s village',
      value: 'MOTHERS_VILLAGE',
      formControl: new FormControl(false),
    },
    {
      label: 'My grandfather"s villagee',
      value: 'GRAND_FATHERS_VILLAGE',
      formControl: new FormControl(false),
    },
    {
      label: 'My grandmother"s village',
      value: 'GRAND_MOTHERS_VILLAGE',
      formControl: new FormControl(false),
    },
    {
      label: 'My in-law"s village',
      value: 'IN_LAWS_VILLAGE',
      formControl: new FormControl(false),
    },
    {
      label: 'Others',
      value: 'OTHER',
      formControl: new FormControl(false),
    },
  ];


  // get selectedCheckboxes(): FormArray {
  //   return this.memberRegistrationForm.get('belongs_as') as FormArray;
  // }

  connectionsForm(): void {
    this.ConnectForm = this.fb.group(
      {
      belongs_as: this.fb.array([]),
      description: [''],
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
      contact_number: ['',Validators.required],
      dob: ['',Validators.required],
      belongs_as: this.fb.array([]),
      description: [''],
      village: this.villageid, 
      user : localStorage.getItem('user')
      
    });
    // this.villageroleoptions = enumToMap(your_role_in_our_village);
    // this.memberform.controls['your_role_in_our_village'].setValue('Villager');
  }

  // onSubmit(): void {
  //   if(this.userservice.isMemberIn===false){}
  //   const userId = localStorage.getItem('user');
  //   console.log(userId,"uuuuuuuuuuuuu")
  //   const {belongs_as,description,village,user, ...memberData} = this.memberform.value;
  //   const {full_name,father_name,contact_number,dob, ...connectdata} = this.memberform.value
  //   this.memberservice.AddMember(memberData,userId).subscribe(
  //     response => {
  //       console.log('Member added successfully:', response);
  //       this.memberform.reset();
  //       this.dialogRef.close();
        
  //       this.memberservice.connect(connectdata).subscribe(
  //         response =>{
  //           console.log(response)
  //         }
  //       )
  //     },
      
      
  //     error => {
  //       console.error('Error adding member:', error);
  //       // Handle error here
  //     }
  //   );
  // }

  onSubmit(): void {
    if (localStorage.getItem('is_member') === 'false') {

      const userId = localStorage.getItem('user');
      console.log(userId, "uuuuuuuuuuuuu");
      const { belongs_as, description, village, user, ...memberData } = this.memberform.value;
      const { full_name, father_name, contact_number, dob, ...connectdata } = this.memberform.value;
  
      this.memberservice.AddMember(memberData, userId).subscribe(
        response => {
          console.log('Member added successfully:', response);
          localStorage.setItem('is_member', 'true');
          // this.userservice.isMemberIn = true
          this.memberform.reset();
          this.dialogRef.close();
          // this.memberservice.refreshvillagedata();
          
          this.memberservice.connect(connectdata).subscribe(
            response => {
              console.log(response);
              this.sharedservice.fetchVillagedata()
              this.sharedservice.fetchByTempleData()
            },
            error => {
              console.error('Error connecting:', error);
              // Handle connection error here
            }
          );
        },
        error => {
          console.error('Error adding member:', error);
          this.memberform.markAllAsTouched();

          // Handle add member error here
        }
      );
    } else {
      const connectdata = this.ConnectForm.value;
      this.memberservice.connect(connectdata).subscribe(
        response => {
          console.log(response);
          this.ConnectForm.reset();
          this.dialogRef.close();
          this.sharedservice.fetchVillagedata()
          // this.memberservice.refreshvillagedata();
        },
        error => {
          console.error('Error connecting:', error);
          // Handle connection error here
        }
      );
    }
  }
  
}
