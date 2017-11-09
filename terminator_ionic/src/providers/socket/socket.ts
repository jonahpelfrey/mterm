import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { Process } from '../../models/models';

@Injectable()
export class SocketProvider {

	private sockAddr: string = 'http://localhost:5000';
	socket: SocketIOClient.Socket;

  	constructor() {
  		this.socket = io(this.sockAddr);
  	}

  	logs(): Observable<any> {
  		return Observable.create(observer => {
  			this.socket.on('stdout', (item: any) => observer.next(item));
  		});
  	}

  	onConnect(): Observable<any> {
  		return new Observable(observer => {
  			this.socket.on('connect', () => observer.complete());
  		});
  	}

  	onDisconnect(): Observable<any> {
  		return new Observable(observer => {
  			this.socket.on('disconnect', () => observer.complete());
  		});
  	}

}
