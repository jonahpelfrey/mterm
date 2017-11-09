import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Process, Service } from '../../models/models';

@Injectable()
export class DataProvider {

	private serviceList: Array<Service> = [];
	public readonly services: Observable<Service[]>;

	private activeProcesses: Array<Process> = [];
	public readonly processes: Observable<Process[]>;

  	constructor(public http: HttpClient) {}

  	public addProcess(proc: Process){
  		//TODO
  	}

  	public removeProcess(proc: Process){
  		//TODO
  	}

	public startTimerForProcess(proc: Process){
  		//TODO
  	}

  	public stopTimerForProcess(proc: Process){
  		//TODO
  	}

  	public getServices(){
  		this.http.get<Service[]>('/api/services').subscribe((res: any) => {
  			this.serviceList.push(res.services);
  		}, err => this.handleError);
  	}

  	private handleError(error: Response) {
    	return Observable.throw(error.statusText);
 	}

}
