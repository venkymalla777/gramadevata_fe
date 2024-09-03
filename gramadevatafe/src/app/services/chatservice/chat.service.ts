import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpclient:HttpClient) { }


  GetConnections(id:string):Observable<any>{
    return this.httpclient.get(URL+'connect?village='+id)
  }

  GetTempleConnections(id:string):Observable<any>{
    return this.httpclient.get(URL+'connect?temple='+id)
  }

  getChat(id:string):Observable<any>{
    return this.httpclient.get(URL+'chat?village='+id)
  }

  getTempleChat(id:string):Observable<any>{
    return this.httpclient.get(URL+'chat?temple='+id)
  }

  postchat(chatdata:string):Observable<any>{
    return this.httpclient.post(URL+"chat",chatdata)
  }
}
