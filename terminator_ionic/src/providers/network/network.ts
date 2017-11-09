import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketProvider } from '../socket/socket';
import { DataProvider } from '../data/data';
import { Log, Process, Service } from '../../models/models';

@Injectable()
export class NetworkProvider {

	private serviceList: Service[];
	private _services: BehaviorSubject<Service[]> = new BehaviorSubject([]);
	public readonly services: Observable<Service[]> = this._services.asObservable();

  	constructor(public http: HttpClient) {
    
  	}

  	spawn(process: Process): Observable<any>{
  		return Observable.create(observer => {
  			this.http.post('/api/start', process)
  		});
  	}

  	kill(process: Process): Observable<any>{
  		return Observable.create(observer => {
  			this.http.post('/api/end', process)
  		});
  	}

  	getServices() {
  		this.http.get<Service[]>('/api/services').subscribe(res => {
  			this.serviceList = res;
  			this._services.next(this.serviceList);
  		}, err => console.log(err));
  	}


}
