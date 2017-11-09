import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketProvider } from '../socket/socket';
import { NetworkProvider } from '../network/network';
import { Log, Process } from '../../models/models';

@Injectable()
export class ProcessProvider {

	private logList: Log[] = [];
	private _logs: BehaviorSubject<Log[]> = new BehaviorSubject([]);
	public readonly logs: Observable<Log[]> = this._logs.asObservable();

	private socketService: SocketProvider;

	constructor(private networkService: NetworkProvider) {

		this.socketService = new SocketProvider();

        this.socketService.onConnect().subscribe(
            x => {},
            e => {},
            () => console.log('Connected')
        );

        this.socketService.onDisconnect().subscribe(
        	x => {},
        	e => {},
        	() => console.log('Disconnected')
        );

        this.socketService.logs().subscribe(
        	logs => {
        		this.logList.push(logs);
        		this._logs.next(this.logList);
        	},
        	error => {
        		console.log(error);
        	}
        );

  	}

  	onStart(process: Process): void {
  		this.networkService.spawn(process).subscribe(res => {
              //handle response
          }, err => console.log(err));
  	}

    onEnd(process: Process): void {
        this.networkService.kill(process).subscribe(res => {
            //handle response
        }, err => console.log(err));
    }
  	


}
