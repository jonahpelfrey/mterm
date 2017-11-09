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