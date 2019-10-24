import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conexion con el servidor: ON');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Conexion con el servidor: OFF');
      this.socketStatus = false;
    });

  }
  /**
   * emit('EVENTO', payload, callback)
   */
  emit( event: string, payload?: any, callback?: () => void ) {
    console.log('Emitiend: ', event)
    this.socket.emit( event, payload, callback );
  }

  listen( event: string ) {
    return this.socket.fromEvent(event);
  }
}
