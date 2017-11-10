import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ProcessService } from './process.service';
import { SocketProvider } from '../../providers/socket/socket';

import { IService, PService } from '../../models/service.model';

@Injectable()
export class ServiceManager {

	private serviceList: IService[] = [];
	private pList: PService[] =[];
	private services: BehaviorSubject<IService[]> = new BehaviorSubject<IService[]>([]);

	constructor(private processService: ProcessService) {}

	configure(): void {
		//Fetch services and then
		for(var i = 0; i < this.serviceList.length; i++) {
			this.pList[i] = {
				name: this.serviceList[i].name,
				active: this.serviceList[i].active.asObservable(),
				connection: this.serviceList[i].connection.asObservable()
			}
		}
	}

	listen(name: string) {
		let service = this.serviceList.find(s => s.name === name);
		let index = this.serviceList.indexOf(service);

		this.serviceList[index].socket = new SocketProvider(service.address);
		this.serviceList[index].socket.onEvent().subscribe( status => {
			this.serviceList[index].connection.next(status);
		});
	}

	//Start a service
	start(name: string) {
		let service = this.serviceList.find(s => s.name === name);
		let index = this.serviceList.indexOf(service);
		//Process Service request made to api
		//Then
		this.serviceList[index].active.next(true);

	}

	//Stop a service
	stop(name: string) {
		let service = this.serviceList.find(s => s.name === name);
		let index = this.serviceList.indexOf(service);
		//Process Service request made to api
		//Then
		this.serviceList[index].active.next(false);
	}

}