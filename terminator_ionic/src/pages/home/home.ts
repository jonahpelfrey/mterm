import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { ProcessComponent } from '../../components/process/process';
import { Process } from '../../models/models';
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


    	this.newTask = {id: 1, name: "Mongod", controls: ["Start", "Stop"], logs: []};
    	this.commands.push(this.newTask);
  	}

}
