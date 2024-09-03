import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TempleserviceService {

  Url=""

  constructor(private httpclient:HttpClient) { }

  
  GetTemplesbyCategory(_id: string): Observable<any> {
    return this.httpclient.get(URL+"templeget/category/" + _id);
  }


  getTempleMain():Observable<any>{
        return this.httpclient.get(URL+"templemain")
      }

  getbytemple(_id:string):Observable<any>{
    return this.httpclient.get(URL+"templeget/_id/"+ _id)
  }



  GetAllCountries():Observable<any>{
    return this.httpclient.get(URL+"country")
  }


  getbyindiatemplesall(page = 1): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString()); // Convert page to string
    return this.httpclient.get(URL + "indiatemples", { params });
  }


  getglobalTemples(page = 1):Observable<any> {
    let params = new HttpParams();
    params =params.set('page',page.toString());
    return this.httpclient.get(URL+"globaltemples",{ params });
  }

  getbycountrytemples(_id:string):Observable<any>{
    return this.httpclient.get(URL+'templeget/object_id/'+_id)
  }

  getStates():Observable<any> {
    return this.httpclient.get(URL+"state")
  }
  getbyStates(_id:string):Observable<any> {
    return this.httpclient.get(URL+"state?country="+_id)
  }

  getStatetemples(id:string):Observable<any>{
    return this.httpclient.get(URL+"temples/state_id/"+id)
  }

  getdistricts(_id:string):Observable<any>{
    return this.httpclient.get(URL+"district?state="+_id)
  }

  getDistrictsTemples(_id:string):Observable<any>{
    return this.httpclient.get(URL+"temples/district_id/"+_id)
  }

  getblocks(_id:string):Observable<any>{
    return this.httpclient.get(URL+"block?district_id="+_id)
  }

  getBlockTemples(_id:string):Observable<any>{
    return this.httpclient.get(URL+"temples/block_id/"+_id)
  }
  getvillages(_id:string):Observable<any>{
    return this.httpclient.get(URL+"village?block="+_id)
  }

  addTemple(templeData: any): Observable<any> {
    return this.httpclient.post("http://127.0.0.1:8000/hindu/temple", templeData);
  }

  getTempleCategorybyId(_id:string):Observable<any>{
    return this.httpclient.get(URL+'templeCategeory?_id='+_id)
  }


  getStatesbyCategoeyTemples(_id:string):Observable<any>{
    return this.httpclient.get(URL+'?object_id__block__district__state_id='+_id)
  }

  // filtertemples(categoryId:string,locationID:string):Observable<any>{
  //   return this.httpclient.get(URL+'locationByTemples/?category='+categoryId+'&input_value='+locationID)
  // }

  filtertemples(categoryId: string, locationId: string, page: number = 1): Observable<any> {
    return this.httpclient.get(`${URL}locationByTemples/`, {
      params: {
        category: categoryId,
        input_value: locationId,
        page: page.toString()
      }
    });
  }

  gettemplecategorybyname(id:string):Observable<any>{
    return this.httpclient.get(URL+"templeCategeory?name="+id)
  }


  getalltemples():Observable<any>{
    return this.httpclient.get(URL+"temple")
  }

  GetVillageByTemples(_id:any):Observable<any>{
    return this.httpclient.get(URL+"templeget/object_id/"+_id)
  }

  filteryourtemples(locationId: string): Observable<any> {
    return this.httpclient.get(`${URL}locationByTemples/`, {
      params: {
        
        input_value: locationId,
        
      }
    });
  }
  


}




