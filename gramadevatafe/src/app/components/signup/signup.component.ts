import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userservice/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyComponent } from '../verify/verify.component';
import { MatDialogRef,MatDialog} from '@angular/material/dialog';
import { phoneOrEmailValidator } from '../email&phonenumbervalidator';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isIndianUser: boolean = false;
  usernameType: string = 'email';

  constructor(private userService: UserService,
     private fb: FormBuilder ,
     private dialog:MatDialog,
     public dialogRef: MatDialogRef<SignupComponent>) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      // userType: ['non-indian', Validators.required],
      username: ['', [Validators.required, phoneOrEmailValidator()]]
     
    });


  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log("egvervfv")
      const userData = this.signupForm.value
      console.log(userData,"efwcfc")
      this.userService.signup(userData).subscribe(response => {
        console.log('Signup successful', response);
        this.dialogRef.close();
        this.openOtpDialog(userData.username);
        
      }, response => {
        console.error('Signup failed', response);
        this.markAllAsTouched();
        // Handle signup error
      });
    }
    else {
      console.error('registerfailed')
      this.markAllAsTouched();
    }
  }


  openOtpDialog(username: string): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: { username }, 
      // data: { displayName: 'signup' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }


  private markAllAsTouched() {
    Object.keys(this.signupForm.controls).forEach(field => {
      const control = this.signupForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  
  

}

