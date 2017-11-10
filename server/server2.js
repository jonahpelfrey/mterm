/** 
* =============================================================================
* Imports
* =============================================================================
*/
var config		= require('./config.js');
var spawn 		= require('child_process').spawn;
var app 		= require('express')();
var server 		= require('http').createServer(app);
var io 			= require('socket.io')(server);

/** 
* =============================================================================
* SOCKET CONFIG
* =============================================================================
*/
io.on('connection', (client) => {

	console.log("USER CONNECTED");

	client.on('disconnect', () => {
		console.log("USER DISCONNECTED");
		//END ALL TASKS BEING RUN BY USER
	});

	client.on('task-start', () => {

		spawnService(0, 0);
	});

	client.on('task-end', () => {

		//END A TASK
	});

});

/** 
* =============================================================================
* CHILD PROCESSES
* =============================================================================
*/
var services = [];
var buffer = [];
var index = 0;
var timeoutObj;
var timeoutSet = false;

function sendBuffer(){
	return function(){
		
		if(buffer.length > index){

			var newData = buffer.slice(index, buffer.length);
			index = buffer.length;

			var output = {
				data: newData
			};

			//Currently won't work if you're running multiple child processes. Both outputs will be considered the same from the client view
			io.sockets.emit('stdout', output);
		}
		else {
			clearTimeout(timeoutObj);
			timeoutSet = false;
		}
	}
}

function spawnService(service, task){

	//Fetch task to perform
	var service = config.services[service];
	var task = service.processes[task];

	//Spawn child process running task
	var child = spawn(task.cmd, task.args, { cwd: task.path });
	services.push(child);

	//Buffer child process stdout
	child.stdout.on('data', (data) => {
		
		//Set time delay for sending the buffer to client
		if(!timeoutSet) {buffer = []; index = 0; timeoutObj = setTimeout(sendBuffer(), 1500); timeoutSet = true;}

		buffer.push(data.toString());
		console.log(data.toString());

	});

	console.log("Service: |" + service.name + "| <" + task.name + ">");
}

function killService(id){

}


/** 
* =============================================================================
* ROUTES
* =============================================================================
*/
app.get('/', (req, res) => {
    	
	res.send('Terminator');
	
});


/** 
* =============================================================================
* FINAL SETUP
* =============================================================================
*/
server.listen(process.env.PORT || '8080');
console.log('Magic happens on port');












