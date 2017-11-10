import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SocketProvider } from '../providers/socket/socket';

export interface PService {
	name: string,
	active: Observable<boolean>;
	connection: Observable<string>,
}

export interface IService {
	name: string,
	active: BehaviorSubject<boolean>,
	connection: BehaviorSubject<string>,
	process: string,
	address: string,
	socket: SocketProvider,
}

