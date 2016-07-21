import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
@Injectable()  
export class MsgPushService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http: Http) {

    }
  
    getMsg(url) {
       url = url + ".json"
        var response = this.http.get(url).map(res => res.json());
       return response;
    }
}