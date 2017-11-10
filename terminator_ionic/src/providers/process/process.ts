import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketProvider } from '../socket/socket';
import { NetworkProvider } from '../network/network';
import { Log, Process, Connection } from '../../models/models';

@Injectable()
export class ProcessProvider {

    //EXPORT INTERFACE FOR THESE VARIABLES 
	private logList: Log[] = [];
	private _logs: BehaviorSubject<Log[]> = new BehaviorSubject([]);
	public readonly logs: Observable<Log[]> = this._logs.asObservable();

	private socketService: SocketProvider;
    // private connection: BehaviorSubject<String> = new BehaviorSubject<String>("Disconnected");
    // public readonly connectionChange: Observable<any> = this.connection.asObservable();

    private process: Process;
    private state: BehaviorSubject<String> = new BehaviorSubject<String>("Stopped");
    public readonly stateChange: Observable<any> = this.state.asObservable();

    private timer: Subscription;
    private ticks: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    public readonly timeRunning: Observable<Number> = this.ticks.asObservable();

	constructor(private networkService: NetworkProvider) {

        // this.process = process;
		// this.socketService = new SocketProvider('http://localhost:5000');
  //       this.configureSocket();
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
        // this.connection.next("Connected");
    }

    private handleDisconnection(): void {
        //Handle event
        // this.connection.next("Disconnected");
    }

    private handleSocketError(): void {
        //Handle event
        // this.connection.next("Connection Error");
    }

    // start(): void {
    //     this.ticks.next(0);

    //     this.networkService.spawn(this.process).subscribe(res => {
    //        this.didStart();
    //     }, error => console.log(error));
    // }

    private didStart(): void {
        this.state.next("Running");

        let timerObj = Observable.timer(0, 1000);
        this.timer = timerObj.subscribe(t => {
            this.ticks.next(t)
        });
    }

    killProcess(): void {
        this.networkService.kill(this.process).subscribe(res => {
           this.didKill();
        }, error => console.log(error));
    }

    private didKill(): void {
        this.state.next("Stopped");
        this.timer.unsubscribe();
    }

    


}
