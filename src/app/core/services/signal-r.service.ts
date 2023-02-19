import {EventEmitter, Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {GraphValueContent} from "../domain/GraphValueContent";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private readonly hubConnection: signalR.HubConnection;
  onMessageReceived = new EventEmitter<any>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7000/graph')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();
    this.startConnection();
  }

  startConnection = () => {
    this.hubConnection.start()
      .then(() => console.log(`Connection with Graph Information Hub started Hub Id ${this.hubConnection.connectionId}`))
      .catch(err => console.log(`Error while starting connection with Graph Information Hub: ${err}`));
  };
  addGraphValueListener = () => {
    this.hubConnection.on('sendValue', (content: GraphValueContent) => {
      this.onMessageReceived.emit(content);
    })
  };
}
