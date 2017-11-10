import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketProvider } from '../socket/socket';
import { NetworkProvider } from '../network/network';
import { Log, Process, Connection } from '../../models/models';

@Injectable()
export class ProcessProvider {

	private logList: Log[] = [];
	private _logs: BehaviorSubject<Log[]> = new BehaviorSubject([]);
	public readonly logs: Observable<Log[]> = this._logs.asObservable();

	private socketService: SocketProvider;
    private connection: BehaviorSubject<String> = new BehaviorSubject<String>("Disconnected");
    public readonly connectionChange: Observable<any> = this.connection.asObservable();

    private process: Process;
    private state: BehaviorSubject<String> = new BehaviorSubject<String>("Stopped");
    public readonly stateChange: Observable<any> = this.state.asObservable();

	constructor(private networkService: NetworkProvider) {

        // this.process = process;
		this.socketService = new SocketProvider();
        this.configureSocket();
  	}

    configureSocket(): void {
 
        this.socketService.onConnect().subscribe(
            () => this.handleConnection()
        );

        this.socketService.onDisconnect().subscribe(
            () => this.handleDisconnection()
        );

        this.socketService.onSocketError().subscribe(
            () => this.handleSocketError()
        );
    }

    private handleConnection(): void {
        //Handle event
        this.connection.next("Connected");
    }

    private handleDisconnection(): void {
        //Handle event
        this.connection.next("Disconnected");
    }

    private handleSocketError(): void {
        //Handle event
        this.connection.next("Connection Error");
    }

    startProcess(): void {
        this.networkService.spawn(this.process).subscribe(res => {
           //handle response
           this.state.next("Running");
        }, error => console.log(error));
    }

    endProcess(): void {
        this.networkService.kill(this.process).subscribe(res => {
           //handle response
           this.state.next("Stopped");
        }, error => console.log(error));
    }


}
