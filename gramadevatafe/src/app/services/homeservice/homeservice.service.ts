import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  URL = ''
  

  constructor(private httpclient:HttpClient) { }
  
  getHomeData(): Observable<any> {
     // Moved console.log() here
    // return this.httpclient.get('https://backend.gramadevata.com/api/home');
    // return this.httpclient.get('http://127.0.0.1:8000/hindu/home');
    return this.httpclient.get(URL+"home")
  }


  getorg():Observable<any> {
    return this.httpclient.get("https://7437-49-205-240-92.ngrok-free.app/api/country")
  }
  
}

