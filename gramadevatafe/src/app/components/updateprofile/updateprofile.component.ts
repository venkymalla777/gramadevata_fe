import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/userservice/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  profileForm!:FormGroup
  userId:any;
  // profileImage: any = null;
  profileImage: string | ArrayBuffer | null = null;


  constructor(
    private fb: FormBuilder,
    private userservice:UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateprofileComponent>,
  ){}


  ngOnInit(){

    this.initializeForm()
    this.getProfileData()

  }

  initializeForm() {
    this.profileForm = this.fb.group({
      full_name: ['', Validators.required],
      father_name: [''],
      gender: [''],
      dob: [''],
      contact_number: ['', Validators.required],
      profile_pic: [''],
      email: ['', [Validators.required, Validators.email]],
     
    });
  }

  getProfileData() {
    this.userId = localStorage.getItem('user')
    this.userservice.profiledata(this.userId).subscribe((response: any) => {
      this.profileForm.patchValue({
        full_name: response.full_name,
        father_name: response.father_name,
        gender: response.gender,
        dob: response.dob,
        contact_number: response.contact_number,
        email:response.email,
        profile_pic:response.profile_pic

        // Map other fields as necessary
      });
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.userservice.updateprofile(this.profileForm.value, this.userId).subscribe((response: any) => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile', this.userId]); // Redirect to the profile page after update
      }, error => {
        console.log('Failed to update profile!');
      });
    }
  }




  // Function to handle file change
  // onFileChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input && input.files && input.files[0]) {
  //     const file = input.files[0];
      
  //     // Convert image to Base64
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.profileImage = reader.result; 
  //       console.log(this.profileImage,"this.profileImage")
  //       const base64String = reader.result?.toString(); // Base64 string to pass to profile_pic
  //       console.log(base64String,"this.profileImage11")
  //       this.profileForm.patchValue({
  //         profile_pic: base64String
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result?.toString() || '';
        const base64String = base64StringWithPrefix.split(',')[1]; // Remove the prefix (data:image/jpeg;base64,)
  
        // Store base64 string without the prefix in the form and class variable
        this.profileImage = base64String;
        console.log(this.profileImage, "this.profileImage");
  
        // Update the form value with the Base64 string without the prefix
        this.profileForm.patchValue({
          profile_pic: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('profile_pic') as HTMLElement;
    fileInput.click(); // Trigger the file input click
  }
  
  
  
  

}
