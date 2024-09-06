import { Component,Inject} from '@angular/core';
import { UserService } from '../../services/userservice/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationHelper } from '../commons/notification';
import { AuthenticationService } from '../../services/authenticationservice/authentication.service';
import { otpValidator } from '../otpverify';





@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  verifyForm!: FormGroup;
  username:string;
  memberstatus: any;

  constructor(private userService:UserService,
     private fb:FormBuilder,
     public dialogRef: MatDialogRef<VerifyComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private notificationHelper: NotificationHelper,
     private authenticationService: AuthenticationService,
     private userservice:UserService,
     
    ){
      this.username = data.username;
  }

  ngOnInit():void{
    this.verifyForm = this.fb.group({
      verification_otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }





  onSubmit(): void {
    if (this.verifyForm.valid) {
      const verificationData = {
        username: this.username,
        verification_otp: this.verifyForm.value.verification_otp
      };
      this.userService.verifyotp(verificationData).subscribe(
        response => {
          console.log('OTP verified successfully', response);
          this.dialogRef.close(true);
          this.notificationHelper.showSuccessNotification('Login Success', '');
          let loginRresponsees = JSON.parse(JSON.stringify(response));
          loginRresponsees?.access
          ? localStorage.setItem('token', loginRresponsees.access)
          : null;
          loginRresponsees?.refresh
          ? localStorage.setItem('refresh', loginRresponsees.refresh)
          : null;
          loginRresponsees?.user_id
          ? localStorage.setItem('user', loginRresponsees.user_id)
          : null;
          loginRresponsees?.username
          ? localStorage.setItem('username', loginRresponsees.username)
          : null;
          loginRresponsees?.is_member

          this.memberstatus= response.is_member
          this.userService.isMemberIn = this.memberstatus === true;

          console.log("swdefg",this.memberstatus)
          if (this.memberstatus === true) {
            console.log("123456")
            this.userService.isMemberIn = true;
          }
          else{
            this.userService.isMemberIn = false;
          }
          
          
        
 
        this.authenticationService.isLoggedIn = true;
        
        // this.router.navigate(['/home']);
        },
        error => {
          console.error('Error verifying OTP', error);
          this.notificationHelper.showErrorNotification('Invalid Otp');
          this.verifyForm.markAllAsTouched();
         
        }
      );
    } else {
      this.markAllAsTouched();
    }
  }


  private markAllAsTouched() {
    Object.keys(this.verifyForm.controls).forEach(field => {
      const control = this.verifyForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}



// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { UserService } from '../../services/userservice/user.service';
// import { NotificationHelper } from '../commons/notification';

// @Component({
//   selector: 'app-verify',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
//   templateUrl: './verify.component.html',
//   styleUrls: ['./verify.component.css']
// })
// export class VerifyComponent {
//   verifyForm!: FormGroup;
//   username: string;

//   constructor(
//     private userService: UserService,
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<VerifyComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private notificationHelper: NotificationHelper,
//   ) {
//     this.username = data.username;
//   }

//   ngOnInit(): void {
//     this.verifyForm = this.fb.group({
//       verification_otp: ['', [Validators.required]]
//     });
//   }

//   onSubmit(): void {
//     if (this.verifyForm.valid) {
//       const verificationData = {
//         username: this.username,
//         verification_otp: this.verifyForm.value.verification_otp
//       };
//       this.userService.verifyotp(verificationData).subscribe(
//         response => {
//           console.log('OTP verified successfully', response);
//           this.dialogRef.close(true);
//           this.notificationHelper.showSuccessNotification('Login Success', '');
//         },
//         error => {
//           console.error('Error verifying OTP', error);
//           this.notificationHelper.showErrorNotification('Verification Failed', error.message);
//         }
//       );
//     } else {
//       this.markAllAsTouched();
//     }
//   }

//   private markAllAsTouched() {
//     Object.keys(this.verifyForm.controls).forEach(field => {
//       const control = this.verifyForm.get(field);
//       control?.markAsTouched({ onlySelf: true });
//     });
//   }
// }
