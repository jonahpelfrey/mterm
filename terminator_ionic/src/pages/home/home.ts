import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { ProcessComponent } from '../../components/process/process';
import { Process } from '../../models/process.model';
import * as io from 'socket.io-client';

@Component({
 	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {

	socket: any;
	output: Array<any> = [];
	segSelect: String = "controls";
	commands: Array<Process> = [];
	newTask: Process;

	constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

		this.socket = io('http://localhost:5000');

		this.socket.on('message', (msg) => {
      		console.log("message", msg);
    	});

    	this.socket.on('stdout', (output) => {
    		
    		for(var i=0; i<output.data.length; i++){
    			this.output.push(output.data);	
    		}
    	});

    	this.newTask = {id: 1, name: "Mongod", controls: ["Start", "Stop"]};
    	this.commands.push(this.newTask);
  	}

  	startMongod(): void {
  		this.socket.emit('task-start');
  	}

  	clearOutput(): void {
  		this.output = [];
  	}


}
