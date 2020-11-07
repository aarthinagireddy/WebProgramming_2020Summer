import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() { }

  sendUser(user){
    this.socket.emit('user', user);
    console.log('Passed user', user);
  }

  relayTraffic(message){
    console.log('Relaying traffic: ', message);
    this.socket.emit('send-traffic', message);
  }

  getTraffic() {
    let observable = new Observable<{msg: string, user: string}>(observer => {
      this.socket = io(this.url);
      this.socket.on('traffic', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

}
