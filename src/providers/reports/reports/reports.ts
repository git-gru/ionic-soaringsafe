import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions , Response } from '@angular/http';
import { AllUrls } from './../../../app/HttpUrls';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ReportsProvider {

  constructor(public http: Http, public aAuth: AngularFireAuth) {
  }

  //Get report data.
  getReportData(){
    // pass current user logedin Id to api
    const apiUrl = AllUrls.Allreportdata + "?userid=" + this.aAuth.auth.currentUser.uid;
    // Add header for json accept
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl,options)
                  .map(this.extractData)
                  .catch(this.handleError);

  }
//Get report data based on profile
  getReportForProfile(params){
 const apiUrl = AllUrls.getProfileData + "?profileid=" + params.profileId + "&querytype=" + params.queryType; 
 // Add header for json accept
 var headers = new Headers();
 headers.append("Accept", "application/json");
 headers.append("Content-Type", "application/json");
 let options = new RequestOptions({ headers: headers });
 return this.http
   .get(apiUrl, options)
   .map(this.extractData)
   .catch(this.handleError);
  }

  //handle api responce
  private extractData(res: Response) {
    let response = res.json();
    return response || { };
  }

  //handle error
  private handleError (error: Response | any) {
    
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
   //throw respective error
    return Observable.throw(errMsg);
  }

}
