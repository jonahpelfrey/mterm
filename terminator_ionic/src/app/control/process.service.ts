import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProcessProvider } from '../../providers/process/process';
import { SocketProvider } from '../../providers/socket/socket';
import { NetworkProvider } from '../../providers/network/network';

import { IService } from '../../models/service.model';

@Injectable()
export class ProcessService {

	constructor(private http: HttpClient) {}



	spawn(process: string): Observable<any>{
  		return this.http.post('/spawn/', process);
  	}

  	kill(process: string): Observable<any>{
  		return this.http.post('/kill/', process);
  	}
}