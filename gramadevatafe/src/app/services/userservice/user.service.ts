import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { OnlymemberComponent } from '../../components/member/onlymember/onlymember.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  isMemberIn = false

  isPujariIn = false
  
  

  constructor(private httpclient:HttpClient,private dialog:MatDialog,) { 
    const storedIsMemberIn = localStorage.getItem('isMemberIn');
    this.isMemberIn = storedIsMemberIn !== null && storedIsMemberIn === 'true';

    const storedIsPujariIn = localStorage.getItem('isPujariIn');
    this.isPujariIn = storedIsPujariIn !== null && storedIsPujariIn === 'true';
  }



  

  isMemberUser() {
    return this.isMemberIn;
  }

  isPujariUser() {
    return this.isPujariIn;
  }


  showMemberModal(): void {
    this.openmemberDialog();
  }


  openmemberDialog(): void {
    console.log('sssssssssss');
    const dialogRef = this.dialog.open(OnlymemberComponent, {
      data: { displayName: 'signup' },
      autoFocus: false,
      backdropClass: 'dialog-backdrop',
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Handle after dialog close actions here
    });
  }

  

  

  signup(userData: any): Observable<any> {
    return this.httpclient.post(URL+"register", userData);
  }

  verifyotp(userData: any): Observable<any> {
    return this.httpclient.post(URL+"verify", userData);
  }


  profiledata(id:any): Observable<any>{
    return this.httpclient.get(URL+"profile_get_by_id/"+id)
  }


  GetConnections(id:string):Observable<any>{
    return this.httpclient.get(URL+'connect?user='+id)
  }


  

  updateprofile(memberData: any, userId: any): Observable<any> {
    const url = `${URL}profile/`+userId;
    const data = { ...memberData,  };
  
    return this.httpclient.put(url, data);
  }




}
