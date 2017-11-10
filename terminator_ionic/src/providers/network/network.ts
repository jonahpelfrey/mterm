import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketProvider } from '../socket/socket';
import { DataProvider } from '../data/data';
import { Log, Process, Service } from '../../models/models';

@Injectable()
export class NetworkProvider {


  	constructor(public http: HttpClient) {
    
  	}

  	spawn(process: string): Observable<any>{
  		return this.http.post('/spawn/', process);
  	}

  	kill(process: Process): Observable<any>{
  		return this.http.post('/kill/', process);
  	}


}
