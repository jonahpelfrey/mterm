import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Process, Service } from '../../models/models';

@Injectable()
export class DataProvider {

	

  	constructor(public http: HttpClient) {}

  	private handleError(error: Response) {
    	return Observable.throw(error.statusText);
 	}

}
