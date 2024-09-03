import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/userservice/user.service';
import { ChatService } from '../../../services/chatservice/chat.service';
import { FormsModule } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../services/memberservice/member.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,NzUploadModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  imagesform!:FormGroup;
  userdata: any;
  userid: any;
  connectdata: any;
  connectedTemples: any;
  connectedTemplescount: any;
  connectdvillges: any;
  connectdvillgescount: any;
  useraddedtemples: any;
  images: string[] = [];
  selectedImage: string | null = null;
  fileList: NzUploadFile[] = [];
  bannerFileList: NzUploadFile[] = [];
  villageconnections: any;
  templeconnections: any;
  addedtemples: any;
  imagesdata: any;
  familyimages: any;
  goshaladata: any;
  eventdata: any;


  constructor(
     protected UserService:UserService,
     private chatservice:ChatService,
     private router:Router,
     private fb:FormBuilder,
     private memberservice:MemberService
    ){}
  ngOnInit():void{
    this.fetchprofiledata();
    // this.connectiondata();

    this.imagesform = this.fb.group({
      family_images : [[], Validators.required]
    })

  }


  onViewImage(index: number) {
    // Logic to view the image
    console.log('View image at index:', index);
    // Implement your view logic here
  }
  
  onDeleteImage(index: number) {
    // Logic to delete the image
    this.familyimages.splice(index, 1);
    console.log('Deleted image at index:', index);
    // Implement any additional deletion logic here
  }
  
  




  fetchprofiledata(): void {
    this.userid = localStorage.getItem('user');
    this.UserService.profiledata(this.userid).subscribe(
      data => {
        this.userdata = data;
        this.familyimages = data.family_images
        this.goshaladata = data.goshalas
        this.eventdata = data.events
        console.log(this.userdata, "userdata");
        this.villageconnections = [];
          this.templeconnections = [];
          this.addedtemples = [];
          
        this.villageconnections.push(...data.Connections.filter((conn: any) => conn.temple === null));
        this.templeconnections.push(...data.Connections.filter((conn: any) => conn.village === null));
        this.connectedTemplescount = this.templeconnections.length
        this.connectdvillgescount = this.villageconnections.length
  
        if (Array.isArray(data)) {
          this.useraddedtemples = data;
          
          
  
          // Assuming `Connections` should be fetched from each user in the array
          
          this.familyimages =[];
  
          this.useraddedtemples.forEach((user: any) => {
            console.log("swdefrgth")
            if (user.Connections && Array.isArray(user.Connections)) {
              this.villageconnections.push(...user.Connections.filter((conn: any) => conn.temple === null));
              this.templeconnections.push(...user.Connections.filter((conn: any) => conn.village === null));
              this.connectedTemplescount = this.templeconnections.length
              this.connectdvillgescount = this.villageconnections.length
              this.familyimages =user.family_images


            }
          });

          // this.addedtemples = this.addedtemples || [];

          this.useraddedtemples.forEach((user: any) => {
            if (user.temples && Array.isArray(user.temples)) {
              this.addedtemples.push(...user.temples);
              
            }
          });

          console.log(this.connectedTemplescount, "connectedTemplescount");
          console.log(this.connectdvillgescount, "connectdvillgescount");
          console.log(this.familyimages, "familyimages");
  
          console.log(this.addedtemples, "addedtemples");
          console.log(this.villageconnections, "villageconnections");
          console.log(this.templeconnections, "templeconnections");
  
        } else {
          this.useraddedtemples = data;
  
          if (data.Connections && Array.isArray(data.Connections)) {
            this.villageconnections = data.Connections.filter((conn: any) => conn.temple === null);
            this.templeconnections = data.Connections.filter((conn: any) => conn.village === null);
            console.log(this.villageconnections, "villageconnections");
            console.log(this.templeconnections, "templeconnections");
          }
  
          this.addedtemples = data.temples || [];
          console.log(this.addedtemples, "addedtemples");
        }
  
        console.log(this.useraddedtemples, "useraddedtemples");
      },
      error => {
        console.error("Error fetching profile data", error);
      }
    );
  }
  



  onFileSelected(event: any) {
    if (event.target.files) {
      const selectedFiles = event.target.files;
      const fileArray = Array.from(selectedFiles);
  
      if (fileArray.length + this.bannerFileList.length > 10) {
        alert('You can upload a maximum of 10 images.');
        return;
      }
  
      fileArray.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.bannerFileList.push({
            uid: Math.random().toString(36).substring(7),
            name: file.name,
            status: 'done',
            url: e.target.result,
          });
  
          this.getBase64(file, (base64String) => {
            const currentImages = this.imagesform.get('family_images')?.value || [];
            this.imagesform.patchValue({ family_images: [...currentImages, base64String] });
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }
  

  handleBannerFileRemove(file: any): boolean {
    // Remove the file from the list
    this.bannerFileList = this.bannerFileList.filter(f => f.uid !== file.uid);
    return true;
  }

  // handleBannerFileRemove(): void {
  //   // Handle file remove event if needed
  //   if (this.bannerFileList.length === 0) {
  //     // No files remaining, trigger validation message
  //     this.bannerFileList = [];
  //   }
  // }


   handleBannerFileChange(info:NzUploadChangeParam):void {
    this.handleUpload(info, 'bannerImage');
   }
  
   handleUpload(info: NzUploadChangeParam, formControlName: string): void {
    const fileList = [...info.fileList];
  
    // Initialize an empty array to store base64 strings
    const base64Images: string[] = [];
  
    fileList.forEach((file: NzUploadFile) => {
      this.getBase64(file.originFileObj!, (base64String: string) => {
        file['base64'] = base64String;
        base64Images.push(base64String);
  
        // Update the form control once all images are processed
        if (base64Images.length === fileList.length) {
          this.imagesform.patchValue({ family_images: base64Images });
          console.log('Updated images form:', this.imagesform.value);
        }
      });
    });
  
    if (formControlName === 'bannerImage') {
      this.bannerFileList = fileList;
    }
  
    console.log('File upload:', info.fileList);
  }
  
  
  getBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
        let base64String = reader.result as string;
        // Extract base64 string without the data URI scheme
        base64String = base64String.split(',')[1];
        console.log('Base64 string:', base64String); // Print base64 string
        callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  // In your component.ts file
imagePaths: string[] = [
  '../../../assets/village1.jpg',
  '../../../assets/village2.jpg',
  '../../../assets/village3.jpg',
  '../../../assets/village4.jpg'
];

navigateTempleDetail(_id:string):void{
  this.router.navigate(["getbytemples",_id])
}

navigateToVillageDetail(_id:any):void{
  this .router.navigate(['villages',_id])
}

onsubmit():void{
  this.userid = localStorage.getItem('user');
  this.imagesdata = this.imagesform.value
  console.log(this.imagesdata,"this.imagesdata")
  this.memberservice.AddFamilyImages(this.imagesdata,this.userid).subscribe(
    data =>{
      console.log("images added", data)    }
  )
}

navigateTogoshaladetail(_id: string): void {
  console.log("Clicked", _id);
  console.log("Navigating to temples with ID:", _id);
  this.router.navigate(['getbygoshala', _id])
    .then(() => console.log("Navigation successful"))
    .catch(error => console.error("Navigation failed:", error));
}


navigateEventdata(event:string):void{
  this.router.navigate(['detailviewevent',event])
}






}
