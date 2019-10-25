import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';
import { LS_USERS } from '../config/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  public user: User = null;

  constructor(private socket: Socket, private router: Router) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conexion con el servidor: ON');
      this.socketStatus = true;
      this.loadStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('Conexion con el servidor: OFF');
      this.socketStatus = false;
    });

  }
  /**
   * emit('EVENTO', payload, callback)
   */
  emit( event: string, payload?: any, callback?: (args: any) => void ) {
    console.log('Emitiend: ', event);
    this.socket.emit( event, payload, callback );
  }

  listen( event: string ) {
    return this.socket.fromEvent(event);
  }

  loginWS(name: string) {
    return new Promise((resolve, reject) => {
      this.emit('config-user', { name }, (resp) => {
        this.user = new User(name);
        this.saveStorage();
        resolve();
      });
    });

    // this.socket.emit('config-user', { name }, (resp) => {
    //   console.log(resp);
    // });

  }

  logoutWS() {
    this.user = null;
    localStorage.removeItem(LS_USERS);
    this.emit('config-user', { name: 'sin-nombre' }, () => {});
    this.router.navigateByUrl('/');
  }

  getUser() {
    return this.user;
  }

  saveStorage() {
    localStorage.setItem(LS_USERS, JSON.stringify(this.user));
  }

  loadStorage() {
    if (localStorage.getItem(LS_USERS)) {
      this.user = JSON.parse(localStorage.getItem(LS_USERS));
      this.loginWS(this.user.name);
    }
  }
}
