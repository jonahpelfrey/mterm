import { Component, Input, OnChanges } from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { Process } from '../../models/process.model';

@Component({
 	selector: 'process',
  	templateUrl: 'process.html'
})

export class ProcessComponent implements OnChanges {

	//Process
	process: Process;
	logs: Array<String> = ["View", "Clear"];

	//Component
	ticks: number = 0;
	timer: Subscription;
	segSelect: String = "controls";

	//Params
  	@Input() task: Process;

  	constructor() {}

  	//Called when updates are made to the task object
  	ngOnChanges(): void {
  		this.process = this.task;
  	}

  	//Make a request to start a process based on the ID
  	startProcess(): void {
  		this.startTimer();
  	}

  	stopProcess(): void {
  		this.stopTimer();
  	}

  	//Called when process is successfully started
  	private startTimer(): void {
  		let timerObj = TimerObservable.create(1000, 1000);
    	this.timer = timerObj.subscribe(t => {
	      	this.ticks = t;
	    });
  	}

  	//Called when process is succesfully stopped
  	private stopTimer(): void {
  		this.timer.unsubscribe();
  	}

}
