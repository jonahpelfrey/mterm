import { Observable } from 'rxjs';

export interface Process {
	id: Number,
	name: String,
	controls: Array<String>,
	logs: Array<String>
}

export interface Service {
	name: String,
	processes: Array<Process>
}

export interface Log {
	output: string
}

export interface Connection {
	connected: Observable<boolean>,
	disconnected: Observable<boolean>,
	error: Observable<boolean>
}