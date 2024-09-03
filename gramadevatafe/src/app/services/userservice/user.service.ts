import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isMemberIn = false

  isPujariIn = false
  
  

  constructor(private httpclient:HttpClient) { 
  let isMemberIn = localStorage.getItem('isMemberIn');
  this.isMemberIn = isMemberIn === 'true';

  let isPujariIn = localStorage.getItem('isPujariIn');
  this.isPujariIn = isPujariIn === 'true';
  }

  isMemberUser() {
    return this.isMemberIn;
  }

  isPujariUser() {
    return this.isMemberIn;
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


}
