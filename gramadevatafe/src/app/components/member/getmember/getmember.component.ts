import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-getmember',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getmember.component.html',
  styleUrl: './getmember.component.css'
})
export class GetmemberComponent {

  member:any;

  constructor(
    public dialogRef: MatDialogRef<GetmemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  
  ngOnInit(): void {
    this.member = this.data.member;
    console.log(this.member, "11111111111");
  }
}
