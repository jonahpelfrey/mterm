import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable';

import { Process, Log } from '../../models/models';
import { ProcessProvider } from '../../providers/process/process';
import { ServiceManager } from '../../app/control/service.manager';

import { IService } from '../../models/service.model';

@Component({
 	selector: 'process',
  	templateUrl: 'process.html'
})

export class ProcessComponent implements OnChanges {

    //Process
    process: Process;
    logs: Observable<Log[]>;
    processState: Observable<String>;
    socketConnection: Observable<String>;
    //Component
    ticks: number = 0;
    timer: Subscription;
    segSelect: String = "controls";

    //Params
    @Input() task: Process;
    constructor(private serviceManager: ServiceManager) {
        // this.processState = processService.stateChange;
        // this.socketConnection = processService.connectionChange;
    }

    ngOnInit() {
        // this.logs = this.processService.logs;
    }

    //Called when updates are made to the task object
    ngOnChanges(): void {
         this.process = this.task;
    }

    //Called when process is successfully started
    private startTimer(): void {
    	let timerObj = Observable.timer(0, 1000);
    	this.timer = timerObj.subscribe(t => {
      	    this.ticks = t;
        });
    }

    //Called when process is succesfully stopped
    private stopTimer(): void {
    	this.timer.unsubscribe();
    }

}

// export class ServiceView {

//     services: Observable<IService[]>;

//     constructor(private serviceManager: ServiceManager) {

//         this.services = this.serviceManager.services;
//     }

//     //Start a service
//     start(serviceId: string) {
//         this.serviceManager.start(serviceId);
//     }

//     //Stop a service
//     stop(serviceId: string) {
//         this.serviceManager.stop(serviceId);
//     }
// }

















