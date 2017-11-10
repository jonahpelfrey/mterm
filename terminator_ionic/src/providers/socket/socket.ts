import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { Process } from '../../models/models';

@Injectable()
export class SocketProvider {

	socket: SocketIOClient.Socket;

  	constructor(connection: string) {
  		this.socket = io(connection);
  		// console.log("Connection: " + connection);
  	}
  	
  	logs(): Observable<any> {
  		return Observable.create(observer => {
  			this.socket.on('stdout', (item: any) => observer.next(item));
  		});
  	}

  	onConnect(): Observable<any> {
  		return new Observable(observer => {
  			this.socket.on('connect', () => observer.next());
  		});
  	}

  	onDisconnect(): Observable<any> {
  		return new Observable(observer => {
  			this.socket.on('disconnect', () => observer.next());
  		});
  	}

  	onSocketError(): Observable<any> {
  		return new Observable(observer => {
  			this.socket.on('connect_error', () => observer.next());
  		});
  	}

  	onEvent(): Observable<string> {
  		return new Observable(observer => {
  			this.socket.on('connect', () => observer.next('Connected'));
  			this.socket.on('disconnect', () => observer.next('Disconnected'));
  			this.socket.on('connect_error', () => observer.next('Connection Error'));
  		});
  	}


}
