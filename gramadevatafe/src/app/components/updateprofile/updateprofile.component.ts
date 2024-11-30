// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/userservice/user.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { SharedService } from '../../services/sharedservice/shared.service';




// @Component({
//   selector: 'app-updateprofile',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './updateprofile.component.html',
//   styleUrl: './updateprofile.component.css'
// })
// export class UpdateprofileComponent {
//   profileForm!:FormGroup
//   userId:any;
//   // profileImage: any = null;
//   profileImage: string | ArrayBuffer | null = null;
//   profile_pic:any;


//   constructor(
//     private fb: FormBuilder,
//     private userservice:UserService,
//     private router: Router,
//     private route: ActivatedRoute,
//     public dialogRef: MatDialogRef<UpdateprofileComponent>,
//     private sharedservice:SharedService,
    
//   ){}


//   ngOnInit(){

//     this.initializeForm()
//     this.getProfileData()

//   }

//   initializeForm() {
//     this.profileForm = this.fb.group({
//       full_name: ['', Validators.required],
//       father_name: [''],
//       gender: [''],
//       dob: [''],
//       contact_number: ['', Validators.required],
//       profile_pic: [''],
//       email: ['', [Validators.required, Validators.email]],
     
//     });
//   }

//   // getProfileData() {
//   //   this.userId = localStorage.getItem('user')
//   //   this.userservice.profiledata(this.userId).subscribe((response: any) => {
//   //     this.profileForm.patchValue({
//   //       full_name: response.full_name,
//   //       father_name: response.father_name,
//   //       gender: response.gender,
//   //       dob: response.dob,
//   //       contact_number: response.contact_number,
//   //       email:response.email,
//   //       profile_pic:base64
//   //       // fetchImageAsBase64(profile_pic)


//   //       // Map other fields as necessary
//   //     });
//   //     this.profile_pic =response.profile_pic
//   //     console.log(this.profile_pic,"this.profile_pic")
//   //       this.convertToBase64(this.profile_pic).then(base64 => {
//   //         console.log(base64, "Base64 Profile Picture");
//   //       }).catch(error => {
//   //         console.error("Error converting to base64:", error);
//   //       });
//   //   });
//   // }




  
//   // convertToBase64(url: string): Promise<string | ArrayBuffer | null> {
//   //   return new Promise((resolve, reject) => {
//   //     // Create an XMLHttpRequest to fetch the image
//   //     const xhr = new XMLHttpRequest();
//   //     xhr.onload = () => {
//   //       // Create a FileReader to convert the blob to base64
//   //       const reader = new FileReader();
//   //       reader.onloadend = () => {
//   //         let base64String = reader.result as string;
          
//   //         // Remove the "data:application/octet-stream;base64," part
//   //         const cleanBase64 = base64String.replace(/^data:(application\/octet-stream|image\/[a-z]+);base64,/, '');
  
//   //         resolve(cleanBase64);  // Resolve the cleaned base64 string
//   //       };
//   //       reader.onerror = reject;
//   //       reader.readAsDataURL(xhr.response);  // Read the blob as data URL (base64)
//   //     };
//   //     xhr.onerror = reject;
//   //     xhr.open('GET', url);
//   //     xhr.responseType = 'blob';  // Set the response type to blob
//   //     xhr.send();
//   //   });
//   // }
  
  
//   getProfileData() {
//     this.userId = localStorage.getItem('user');
    
//     this.userservice.profiledata(this.userId).subscribe((response: any) => {
//       // Patch form with received values
//       this.profileForm.patchValue({
//         full_name: response.full_name,
//         father_name: response.father_name,
//         gender: response.gender,
//         dob: response.dob,
//         contact_number: response.contact_number,
//         email: response.email,
//         // Profile pic will be handled after base64 conversion
//       });
  
//       // Handle profile picture conversion to base64
//       this.profile_pic = response.profile_pic;
//       console.log(this.profile_pic, "this.profile_pic");
      
//       if (this.profile_pic) {
//         this.convertToBase64(this.profile_pic)
//           .then(base64 => {
//             console.log(base64, "Base64 Profile Picture");
            
//             // Patch base64 image to the form
//             this.profileForm.patchValue({
//               profile_pic: base64
//             });
//           })
//           .catch(error => {
//             console.error("Error converting to base64:", error);
//           });
//       }
//     });
//   }
  
//   convertToBase64(url: string): Promise<string | ArrayBuffer | null> {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = () => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64String = reader.result as string;
  
//           // Clean up the base64 string (optional depending on your needs)
//           const cleanBase64 = base64String.replace(/^data:(application\/octet-stream|image\/[a-z]+);base64,/, '');
//           resolve(cleanBase64);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(xhr.response);
//       };
//       xhr.onerror = reject;
//       xhr.open('GET', url);
//       xhr.responseType = 'blob';
//       xhr.send();
//     });
//   }
  
  



//   updateProfile() {
//     if (this.profileForm.valid) {
//       this.userservice.updateprofile(this.profileForm.value, this.userId).subscribe((response: any) => {
//         this.sharedservice.fetchByProfiledata()
//         this.router.navigate(['/profile', this.userId]);
        
//         this.dialogRef.close();
//       }, error => {
//         console.log('Failed to update profile!');
//       });
//     }
//   }






//   onFileChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input && input.files && input.files[0]) {
//       const file = input.files[0];
      
//       // Convert image to Base64
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64StringWithPrefix = reader.result?.toString() || '';
//         const base64String = base64StringWithPrefix.split(',')[1]; // Remove the prefix (data:image/jpeg;base64,)
  
//         // Store base64 string without the prefix in the form and class variable
//         this.profileImage = base64String;
//         console.log(this.profileImage, "this.profileImage");
  
//         // Update the form value with the Base64 string without the prefix
//         this.profileForm.patchValue({
//           profile_pic: base64String
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   }
  
//   triggerFileInput() {
//     const fileInput = document.getElementById('profile_pic') as HTMLElement;
//     fileInput.click(); // Trigger the file input click
//   }
  
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/userservice/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../services/sharedservice/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  profileForm!: FormGroup;
  userId: any;
  profileImage: string | ArrayBuffer | null = null;
  profile_pic: any;
  full_name: any;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateprofileComponent>,
    private sharedservice: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getProfileData();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      full_name: ['', Validators.required],
      father_name: ['',Validators.required],
      gender: [''],
      // dob: [''],
      contact_number: ['', Validators.required],
      profile_pic: [''],
      email: ['', [Validators.required, Validators.email]],
      marital_status:[''],
      gotram: [''],
      siblings: [''],
      husband: [''],
      wife: [''],
      children: [''],
      account_type:['']
    });
  }

  getProfileData() {
    this.userId = localStorage.getItem('user');
    this.userservice.profiledata(this.userId).subscribe((response: any) => {
      this.profileForm.patchValue({
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

      this.profile_pic = response.profile_pic;
      if (this.profile_pic) {
        this.convertToBase64(this.profile_pic)
          .then(base64 => {
            this.profileImage = base64;
            this.profileForm.patchValue({
              profile_pic: base64
            });
          })
          .catch(error => {
            console.error("Error converting to base64:", error);
          });
      }
    });
  }

  convertToBase64(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const cleanBase64 = base64String.replace(/^data:(application\/octet-stream|image\/[a-z]+);base64,/, '');
          resolve(cleanBase64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.userservice.updateprofile(this.profileForm.value, this.userId).subscribe(
        (response: any) => {
          // Handle successful update
          this.sharedservice.fetchByProfiledata(); // Update the profile data
          this.router.navigate(['/profile', this.userId]); // Navigate to the updated profile
          this.full_name = this.profileForm.get('full_name')?.value || ''; 
          localStorage.setItem('full_name', this.full_name);
          window.location.reload();
         
          if (this.dialogRef) {
            this.dialogRef.close(); // Close the dialog if open

          }
        },
        (error: any) => {
          console.error('Failed to update profile!', error); // Log the actual error
          this.profileForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
        }
      );
    } else {
      this.profileForm.markAllAsTouched(); // If form is invalid, mark all fields as touched
    }
  }
  
  refreshPage() {
    window.location.reload();
  }
  

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result?.toString() || '';
        const base64String = base64StringWithPrefix.split(',')[1];
        this.profileImage = base64String;
        this.profileForm.patchValue({
          profile_pic: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }


  triggerFileInput() {
    const fileInput = document.getElementById('profile_pic') as HTMLElement;
    fileInput.click();
  }

  onImageError(event: any) {
    event.target.src = 'assets/profile1.webp'; // Set path to your default image
  }
}

