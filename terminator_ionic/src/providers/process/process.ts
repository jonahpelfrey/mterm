import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
        this.configureSocket();
  	}

    configureSocket(): void {
 
        this.socketService.onConnect().subscribe(
            () => console.log('Connected')
        );

        this.socketService.onDisconnect().subscribe(
            () => console.log('Disconnected')
        );

        this.socketService.onSocketError().subscribe(
            () => console.log('Connection Error')
        );
    }

  	startProcess(process: Process): void {
  		this.networkService.spawn(process).subscribe(res => {
              //handle response
          }, error => console.log(error));
  	}

    endProcess(process: Process): void {
        this.networkService.kill(process).subscribe(res => {
            //handle response
        }, error => console.log(error));
    }



}
