import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';

// RUTAS
import { AppRoutingModule } from './app-routing.module';
const config: SocketIoConfig = {
  url: environment.wsUrl,
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    UserListComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
