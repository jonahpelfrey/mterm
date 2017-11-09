import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Process } from '../../models/models';
import * as io from 'socket.io-client';

@Injectable()
export class SocketProvider {

	private url: 'http://localhost:5000';
	private socket: SocketIOClient.Socket;

  	constructor(public http: Http) {

    	this.socket = io(this.url);

    	this.socket.on('message', (msg) => {
    		console.log("message: ", msg);
    	});

    	this.socket.on('process-started', () => {
    		//Process was succesfully started
    		//Start timer
    		//Add process to running processes;
    	});

    	this.socket.on('process-stopped', () => {
    		//Process was successfully stopped
    		//Stop timer
    		//Remove process from running processes;
    	});

    	this.socket.on('process-error', () => {
    		//Process had an issue
    		//Stop timer
    		//Remove process from running processes;
    		//Handle process error?
    	});
  	}

  	public emitStartProcess(proc: Process){
  		this.socket.emit('start-process', proc.id);
  	}

  	public emitStopProcess(proc: Process){
  		this.socket.emit('end-process', proc.id);
  	}

}
