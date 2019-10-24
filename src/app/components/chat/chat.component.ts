import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  text = '';
  messageSubscription: Subscription;

  messages: any[] = [];

  elements: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.elements = document.getElementById('chat-message');
    this.messageSubscription = this.chatService.getMessage().subscribe(msg => {
      this.messages.push(msg);
      setTimeout(() => {
        this.elements.scrollTop = this.elements.scrollHeight;
      }, 50);
    });
  }


  send() {
    if (this.text.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

}
